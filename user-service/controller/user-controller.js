import {
    ormCreateUser as _createUser,
    ormAuthUser as _authUser,
    ormCheckUser as _checkUser,
    ormBlacklistToken as _blacklistToken,
    ormGetBlacklistToken as _getBlacklistedToken,
    ormDeleteUser as _deleteUser,
    ormChangePassword as _changePassword,
} from "../model/user-orm.js";

import { createSaltAndHash } from "../utils/hash-module.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY =
    process.env.ENV == "PROD"
        ? process.env.JWT_SECRET_KEY
        : process.env.JWT_TEST_KEY;

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (
            username &&
            username.trim() !== "" &&
            password &&
            password.trim() !== ""
        ) {
            const usernameInUse = await _checkUser(username);
            if (usernameInUse) {
                return res
                    .status(409)
                    .json({ message: `Username ${username} has been used!` });
            }

            const hashedPassword = await createSaltAndHash(password);

            const resp = await _createUser(username, hashedPassword);
            if (resp.err == null) {
                console.log(`Created new user ${username} successfully!`);
                return res.status(201).json({ message: resp.message });
            }

            // Other unknown error occured
            return res.status(500).json({ message: resp.message });
        } else {
            return res
                .status(400)
                .json({ message: "Username and/or Password are missing!" });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Unexpected database failure when creating new user!",
        });
    }
}

export async function deleteUser(req, res) {
    try {
        const { username } = req.body;
        if (!username || username.trim() === "") {
            return res
                .status(400)
                .json({ message: "Username to delete is missing!" });
        }

        const isValidAccount = await _checkUser(username);
        if (!isValidAccount) {
            return res.status(402).json({
                message: `Account with username ${username} is not valid, unable to delete account`,
            });
        }

        const resp = await _deleteUser(username);
        if (resp.err) {
            return res
                .status(500)
                .json({ message: "Error occured when deleting user" });
        } else {
            return res.status(202).json({
                message: `Deleted new user ${username} successfully!`,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Unexpected database failure when deleting user!",
        });
    }
}

export async function authUser(req, res) {
    try {
        const { username, password } = req.body;
        if (
            !username ||
            username.trim() === "" ||
            !password ||
            password === ""
        ) {
            return res
                .status(400)
                .json({ message: "Username and/or Password are missing!" });
        }

        const resp = await _authUser(username, password);

        if (resp.err) {
            return (
                res.status(500),
                json({ message: "Error occured during authentication" })
            );
        } else {
            if (resp) {
                console.log(`${username} successfully authenticated!`);
                const user = { username: username };
                const jwt_payload =
                    username === "admin"
                        ? { user: user, role: "admin" }
                        : { user: user, role: "user" };
                let token = jwt.sign(jwt_payload, SECRET_KEY);
                res.status(200).json({
                    message: `Logged in as ${username}!`,
                    token,
                });
                return res;
            } else {
                console.log(`Authentication failed for ${username}`);
                return res.status(403).json({
                    message: `Authentication failed for ${username}!`,
                });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occured during login." });
    }
}

export async function checkUser(req, res) {
    try {
        const { username } = req.body;
        if (!username || username.trim() === "")
            return res.status(400).json({ message: "Username is missing!" });

        const resp = await _checkUser(username);

        if (!resp) {
            return res
                .status(200)
                .json({ message: `${username} does not exist` });
        } else {
            return res.status(200).json({ message: `${username} exists!` });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occured during check." });
    }
}

export async function logout(req, res) {
    try {
        const token = req.headers["authorization"];
        if (!token) return res.status(400).json({ message: "No token given!" });
        else {
            // verify token
            jwt.verify(token, SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return res.status(400).json({ message: "Invalid token" });
                } else {
                    const username = decoded.user.username;
                    const resp = await _blacklistToken({ username, token });
                    if (resp.err) {
                        return res
                            .status(400)
                            .json({ message: "Unable to blacklist token" });
                    } else {
                        return res
                            .status(200)
                            .json({ message: "token blacklisted" });
                    }
                }
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occured during logout" });
    }
}

export async function validateToken(req, res) {
    try {
        return res.status(200).send();
    } catch (err) {
        return res.status(400).send();
    }
}

export async function getUsername(req, res) {
    try {
        const token = req.headers["authorization"];
        if (!token) return res.status(400).json({ message: "No token given!" });
        let _username = null;
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" });
            } else {
                _username = decoded.user.username;
            }
        });
        
        return res.status(200).json({ username: _username });
    } catch {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Error occured during getUsername" });
    }
}

export async function changePassword(req, res) {
    try {
        const { username, oldpassword, newpassword } = req.body;
        if (username && username.trim() !== "" && oldpassword && newpassword) {
            const authenticatedUser = await _authUser(username, oldpassword);

            if (authenticatedUser.err || !authenticatedUser) {
                return res.status(401).json({
                    message: `Unable to change password! Please check your credentials!`,
                });
            }

            const hashedPassword = await createSaltAndHash(newpassword);
            const resp = await _changePassword(username, hashedPassword);

            if (resp.err == null && resp) {
                console.log(`Password for ${username} changed successfully!`);
                return res.status(200).json({
                    message: `Password for ${username} changed successfully!`,
                });
            }

            return res.status(500).json({
                message: resp.message || "Unable to change password!",
            });
        } else {
            return res
                .status(400)
                .json({ message: "Username and/or Password(s) are missing!" });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Unexpected database failure when creating new user!",
        });
    }
}

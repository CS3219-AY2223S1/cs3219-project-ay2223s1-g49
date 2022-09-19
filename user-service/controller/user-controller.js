import { 
    ormCreateUser as _createUser,
    ormAuthUser as _authUser,
    ormCheckUser as _checkUser,
    ormBlacklistToken as _blacklistToken,
    ormGetBlacklistToken as _getBlacklistedToken
 } from '../model/user-orm.js'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET_KEY //|| crypto.randomBytes(16).toString('hex')

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const usernameInUse = await _checkUser(username);
            if (usernameInUse) {
                return res.status(409).json({message: `Username ${username} has been used!`});
            }

            const resp = await _createUser(username, password);
            if (resp.err == null) {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: resp.message});
            }

            switch(resp.err.code) {
                case 11000:
                    return res.status(409).json({message: resp.message});

                default:
                    return res.status(500).json({message: resp.message})
            }

        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Unexpected database failure when creating new user!'})
    }
}

export async function authUser(req, res) {
    try{
        const { username, password } = req.body;

        if (!username || username==="" || !password || password===""){
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }

        const resp = await _authUser(username, password);
        console.log(resp)

        if (resp.err){
            return res.status(500),json({message: 'Error occured during authentication'})
        } else {
            if (resp){
                console.log(`${username} successfully authenticated!`)
                const user = { username: username }
                let token = jwt.sign({ user:user },SECRET_KEY)
                res.status(200).json({ message: `Logged in as ${username}!`, token });
                return res;
            } else {
                console.log(`Authentication failed for ${username}`)
                return res.status(403).json({message: `Authentication failed for ${username}!`})
            }
        }
    } catch (err){
        console.error(err)
        return res.status(500).json({message: 'Error occured during login.'})
    }
}

export async function checkUser(req, res) {
    try{
        const { username } = req.body;
        if (!username) return res.status(400).json({message: 'Username is missing!'});

        const resp = await _checkUser(username);
        
        if (!resp) {
            return res.status(200).json({message: `${username} does not exist`});
        } else {
            return res.status(200).json({message: `${username} exists!`});
        }

    } catch (err){
        console.error(err)
        return res.status(500).json({message: 'Error occured during check.'})
    }
}

export async function logout(req, res) {
    try{
        console.log('logout attempt')
        const token = req.headers['authorization'];
        if (!token) return res.status(400).json({message: "No token given!"})
        else {
            // verify token
            jwt.verify(token, SECRET_KEY, async (err,decoded) => {
                if (err){
                    return res.status(400).json({message: "Invalid token"})
                } else{
                    console.log(decoded);
                    const username = decoded.user.username
                    const resp = await _blacklistToken({username,token})
                    if (resp.err){
                        return res.status(400).json({message: "Unable to blacklist token"})
                    } else {
                        return res.status(200).json({message: "token blacklisted"})
                    }
                }
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Error occured during logout'})
    }
}

export async function validateToken(req, res){
    try{
        return res.status(200).send()
    } catch(err){
        return res.status(400).send()
    }
}

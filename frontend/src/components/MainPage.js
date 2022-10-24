import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import axios from "axios";
import {
    URL_USER_LOGOUT,
    URL_USER_DELETE,
    URL_USER_GET_USERNAME,
    URL_USER_CHANGE_PASSWORD,
} from "../configs";
import {
    STATUS_CODE_DELETE_USER_SUCCESS,
    STATUS_CODE_CHANGE_PASSWORD_SUCCESS,
    STATUS_CODE_CHANGE_PASSWORD_INVALID_CRED,
} from "../constants";
import LoginPage from "./LoginPage";
import validateToken from "./validate-token";

function MainPage() {
    const cookies = new Cookies();
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(cookies.get("access token"));
    const [username, setUsername] = useState("");
    const [oldpassword, setOldPw] = useState("");
    const [newpassword, setNewPw] = useState("");
    const [verifynewpassword, setVerifyNewPw] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    if (!token) {
        return <LoginPage setToken={setToken} />;
    }

    validateToken(token).then((tokenValid) => {
        console.log("verifying token");
        if (!tokenValid) {
            console.log("invalid token");
            cookies.remove("access token");
            setIsLogin(false);
        } else {
            console.log("valid token");
            setIsLogin(true);
            initialiseUsername();
        }
    });

    const initialiseUsername = () => {
        const instance = createAxiosHeader();
        instance
            .post(URL_USER_GET_USERNAME)
            .then((res) => {
                setUsername(res.data.username);
            })
            .catch((err) => {
                console.log(
                    "Error getting username from cookie: ",
                    err.toJSON()
                );
            });
    };

    const handleLogout = async () => {
        const instance = createAxiosHeader();
        await instance
            .post(URL_USER_LOGOUT)
            .then((res) => {})
            .catch((err) => {});
        cookies.remove("access token");
        //setIsLogin(false)
        window.location.reload(false);
    };

    const handleDeleteAccount = async () => {
        const instance = createAxiosHeader();
        if (!username || username === "") {
            console.log("No username initialised, please relogin...");
            return;
        }

        await instance
            .post(URL_USER_DELETE, { username })
            .then((res) => {
                if (res && res.status === STATUS_CODE_DELETE_USER_SUCCESS) {
                    console.log("Delete user successful!");
                } else {
                    console.log("Delete user failure!");
                }
            })
            .catch((err) => {
                console.log("Error at handleDeleteAccount: ", err.toJSON());
            });
        handleLogout();
    };

    const handleChangePassword = async () => {
        console.log(
            "old",
            oldpassword,
            "new",
            newpassword,
            "verify",
            verifynewpassword
        );
        if (
            !newpassword ||
            newpassword == "" ||
            !oldpassword ||
            oldpassword == "" ||
            !verifynewpassword ||
            verifynewpassword == ""
        ) {
            console.log("All fields are required");
            alert("All fields are required.");
            return;
        }

        if (newpassword !== verifynewpassword) {
            console.log(
                "New passwords do not match. Please retype your new passwords."
            );
            alert(
                "New passwords do not match. Please retype your new passwords."
            );
            resetPasswordFields();
            return;
        }

        const instance = createAxiosHeader();
        await instance
            .post(URL_USER_CHANGE_PASSWORD, {
                username: username,
                oldpassword: oldpassword,
                newpassword: newpassword,
            })
            .then((res) => {
                if (res && res.status === STATUS_CODE_CHANGE_PASSWORD_SUCCESS) {
                    console.log("Password successfully changed!");
                    alert("Password successfully changed!");
                    handleClose();
                } else {
                    console.log("Unable to change password");
                    alert("Unable to change password, please try again later");
                    resetPasswordFields();
                }
            })
            .catch((err) => {
                if (
                    err.response.status ==
                    STATUS_CODE_CHANGE_PASSWORD_INVALID_CRED
                ) {
                    console.log(
                        "Unable to verify current password. Please try again."
                    );
                    alert(
                        "Unable to verify current password. Please try again."
                    );
                    resetPasswordFields();
                } else {
                    console.log("Error at handleChangePW: ", err.toJSON());
                }
            });
    };

    const resetPasswordFields = () => {
        setOldPw("");
        setNewPw("");
        setVerifyNewPw("");
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        resetPasswordFields();
    };

    function createAxiosHeader() {
        const jwt = cookies.get("access token");
        const instance = axios.create({
            headers: {
                Authorization: jwt,
            },
        });
        return instance;
    }

    return !isLogin ? (
        <LoginPage setToken={setToken} />
    ) : (
        <div>
            <Box display={"flex"} flexDirection={"column"} width={"50%"}>
                <Typography variant={"h3"} marginBottom={"2rem"}>
                    Loggged In Succesfully!
                </Typography>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"centre"}
                >
                    {isLogin ? (
                        <Typography variant={"h5"} marginBottom={"2rem"}>
                            Valid Token
                        </Typography>
                    ) : (
                        <Typography variant={"h5"} marginBottom={"2rem"}>
                            Invalid Token
                        </Typography>
                    )}
                </Box>
            </Box>
            <p>
                <Button
                    variant={"outlined"}
                    onClick={handleLogout}
                    component={Link}
                    to="/mainpage"
                >
                    Log Out
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={handleDeleteAccount}
                    component={Link}
                    to="/mainpage"
                >
                    Delete User
                </Button>
                <Button variant={"outlined"} onClick={handleClickOpen}>
                    Click here to change password
                </Button>
            </p>
            <Dialog open={openDialog} onClose={handleClose}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                        alignItems: "center",
                        margin: 5,
                    }}
                >
                    <Grid sx={{ textAlign: "center" }}>
                        <DialogTitle
                            sx={{
                                letterSpacing: 2,
                                p: 2,
                                mb: 3,
                                fontSize: "h4.fontSize",
                            }}
                        >
                            Change Password
                        </DialogTitle>
                    </Grid>
                    <Grid
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Grid sx={{ my: 2 }}>
                            <div>Old Password</div>
                            <TextField
                                id="oldpw"
                                variant="outlined"
                                type="password"
                                value={oldpassword}
                                onChange={(e) => setOldPw(e.target.value)}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#F1F5F8",
                                    width: "100%",
                                }}
                            ></TextField>
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                            <div>New Password</div>
                            <TextField
                                fullwidth
                                id="oldpw"
                                variant="outlined"
                                type="password"
                                value={newpassword}
                                onChange={(e) => setNewPw(e.target.value)}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#F1F5F8",
                                    width: "100%",
                                }}
                            ></TextField>
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                            <div>Re-enter New Password</div>
                            <TextField
                                fullwidth
                                id="verifynewpw"
                                variant="outlined"
                                type="password"
                                value={verifynewpassword}
                                onChange={(e) => setVerifyNewPw(e.target.value)}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#F1F5F8",
                                    width: "100%",
                                }}
                            ></TextField>
                        </Grid>

                        <Button
                            variant={"outlined"}
                            onClick={handleChangePassword}
                            sx={{
                                my: "2rem",
                                background:
                                    "linear-gradient(45deg, #217F95 20%, #E19D92 90%)",
                                border: 0,
                                borderRadius: 10,
                                boxShadow:
                                    "0 1px 5px 2px rgba(81, 135, 149, .2)",
                                color: "white",
                                height: 48,
                                padding: "0 30px",
                            }}
                        >
                            Change Password
                        </Button>
                    </Grid>
                </Box>
            </Dialog>
        </div>
    );
}

export default MainPage;

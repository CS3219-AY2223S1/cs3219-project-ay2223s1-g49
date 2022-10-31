import { Box, Button, Typography, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
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
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const [openSuccessNotification, setOpenSuccessNotification] =
        useState(false);
    const [openFailureNotification, setOpenFailureNotification] =
        useState(false);
    const [failureType, setFailureType] = useState();

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
        if (
            !newpassword ||
            newpassword.trim() === "" ||
            !oldpassword ||
            oldpassword.trim() === "" ||
            !verifynewpassword ||
            verifynewpassword.trim() === ""
        ) {
            triggerFailureNotification("missing-field");
            return;
        }

        if (newpassword !== verifynewpassword) {
            triggerFailureNotification("wrong-verify-password");
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
                    handleDialogAction("Close");
                    triggerSuccessNotification();
                } else {
                    triggerFailureNotification();
                    resetPasswordFields();
                }
            })
            .catch((err) => {
                if (
                    err.response.status ===
                    STATUS_CODE_CHANGE_PASSWORD_INVALID_CRED
                ) {
                    triggerFailureNotification("wrong-old-password");
                    resetPasswordFields();
                } else {
                    console.log("Error at handleChangePW: ", err.toJSON());
                }
            });
    };

    const triggerSuccessNotification = async () => {
        setOpenSuccessNotification(true);
        await delay(5000);
        setOpenSuccessNotification(false);
    };

    const triggerFailureNotification = async (type) => {
        setFailureType(type);
        setOpenFailureNotification(true);
        await delay(5000);
        setOpenFailureNotification(false);
    };

    const resetPasswordFields = () => {
        setOldPw("");
        setNewPw("");
        setVerifyNewPw("");
    };

    const handleDialogAction = (action) => {
        if (action === "open") {
            setOpenDialog(true);
        }
        if (action === "close") {
            setOpenDialog(false);
            resetPasswordFields();
        }
    };

    const handleConfirmationAction = (action) => {
        if (action === "open") {
            setOpenConfirmation(true);
        }
        if (action === "close") {
            setOpenConfirmation(false);
        }
    };

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const renderNotification = (type) => {
        switch (type) {
            case "wrong-old-password":
                return "Old password entered is invalid, please re-enter your old password.";
            case "wrong-verify-password":
                return "New password mismatch, please re-enter your new password.";
            case "missing-field":
                return "All fields are required, please try again.";
            default:
                return "Unable to change password, please try again later";
        }
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
            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
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
                    onClick={() => handleConfirmationAction("open")}
                >
                    Delete User
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={() => handleDialogAction("open")}
                >
                    Change password
                </Button>
            </p>
            <Dialog
                open={openDialog}
                onClose={() => handleDialogAction("close")}
            >
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
                            <b>Change Password</b>
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
            <Collapse in={openSuccessNotification}>
                <Alert
                    severity="success"
                    onClose={() => {
                        setOpenSuccessNotification(false);
                    }}
                    sx={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        zIndex: 0,
                    }}
                >
                    Password successfully changed!
                </Alert>
            </Collapse>
            <Collapse in={openFailureNotification}>
                <Alert
                    severity="error"
                    onClose={() => {
                        setOpenFailureNotification(false);
                    }}
                    sx={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        zIndex: 0,
                    }}
                >
                    {renderNotification(failureType)}
                </Alert>
            </Collapse>
            <Dialog
                open={openConfirmation}
                onClose={() => handleConfirmationAction("close")}
            >
                <DialogTitle>Confirm deletion of account?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once account is deleted, the information lost will be
                        irreversible.
                        <br></br>
                        Are you sure you want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => handleConfirmationAction("close")}
                        sx={{
                            backgroundColor: "#ED3447",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="text" onClick={handleDeleteAccount}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MainPage;

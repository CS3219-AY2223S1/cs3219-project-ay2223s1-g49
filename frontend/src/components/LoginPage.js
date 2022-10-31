import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import Cookies from "universal-cookie";
import { useState } from "react";
import axios from "axios";
import { URL_USER_LOGIN } from "../configs";
import { STATUS_CODE_LOGIN_SUCCESS } from "../constants";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";
import background from "./background.png";
import logo from "./center-logo.png";
import { makeStyles } from "@mui/styles";
import animatedImage from "./gif.gif";

const useStyles = makeStyles({
    container: {
        display: "flex",
        alignSelf: "center",
        alignItems: "stretch",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    containerOverlay: {
        backgroundColor: "#000000",
        height: "100%",
        width: "100%",
        opacity: "40%",
        position: "absolute",
        top: "0",
    },
    boxContainer: {
        display: "flex",
        height: "75vh",
        width: "60vw",
        alignSelf: "center",
        flexDirection: "row",
        zIndex: "1",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 12px 70px 4px;",
    },
    background: {
        backgroundColor: "white",
    },
    leftPanel: {
        height: "100%",
        backgroundImage: `url(${animatedImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "60%",
        borderRadius: "20px 0 0 20px",
    },
    rightPanel: {
        display: "flex",
        width: "40%",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0 20px 20px 0",
    },
    outline: {
        border: "solid 1px",
    },
    formHeaderOverlay: {
        backgroundColor: "#304b78",
        height: "100%",
        opacity: "10%",
        top: "0",
        borderRadius: "0 20px 0 0",
    },
    formHeader: {
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        minHeight: "25%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "0 20px 0 0",
    },
    form: {
        width: "80%",
        height: "30vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    marginTop: {
        marginTop: "2rem",
    },
    paddingTop: {
        paddingTop: "2rem",
    },
    signUpLink: {
        fontSize: "small",
        color: "#717874",
    },
    fullWidth: {
        width: "100%",
    },
    centralise: {
        display: "flex",
        justifyContent: "center",
    },
});

export default function LoginPage({ setToken }) {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");

    const handleLogin = async () => {
        if (username === "" || password === "") {
            setErrorDialog("Username or Password is missing!");
            return;
        }
        const res = await axios
            .post(URL_USER_LOGIN, { username, password })
            .catch((err) => {
                setErrorDialog(
                    "Login failed! Please check your Username and Password!"
                );
                return;
            });
        if (res && res.status === STATUS_CODE_LOGIN_SUCCESS) {
            const cookies = new Cookies();
            cookies.set("access token", res.data.token, {
                path: "/",
                expires: new Date(Date.now() + 86400000),
            }); // token expires in a day(86400000 ms)
            console.log("cookie returned");
            console.log(cookies.get("access token"));
            setToken(res.data.token);
        }
    };

    const closeDialog = () => setIsDialogOpen(false);

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Success");
        setDialogMsg(msg);
    };

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Error");
        setDialogMsg(msg);
    };

    return (
        <div className={classes.container}>
            <div className={`${classes.containerOverlay}`}></div>
            <Box className={`${classes.boxContainer}`}>
                <div className={classes.leftPanel}></div>
                <div className={`${classes.rightPanel} ${classes.background}`}>
                    <div className={`${classes.formHeader}`}>
                        <div className={`${classes.formHeaderOverlay}`}></div>
                    </div>
                    <Box className={`${classes.form}`}>
                        <div
                            className={`${classes.marginTop} ${classes.fullWidth} ${classes.paddingTop}`}
                        >
                            <PeopleAltIcon
                                style={{
                                    width: "10%",
                                    padding: "0.5rem",
                                    color: "gray",
                                    transform: "scale(3)",
                                }}
                            />
                            <TextField
                                placeholder="Username"
                                variant="standard"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ marginBottom: "1rem", width: "80%" }}
                                autoFocus
                            />
                        </div>
                        <div
                            className={`${classes.marginTop} ${classes.fullWidth}`}
                        >
                            <LockIcon
                                style={{
                                    width: "10%",
                                    padding: "0.5rem",
                                    color: "gray",
                                    transform: "scale(3)",
                                }}
                            />
                            <TextField
                                placeholder="Password"
                                variant="standard"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ marginBottom: "2rem", width: "80%" }}
                            />
                        </div>
                        <div
                            className={`${classes.marginTop} ${classes.fullWidth} ${classes.centralise}`}
                        >
                            <Button
                                variant={"contained"}
                                onClick={handleLogin}
                                sx={{
                                    width: "60%",
                                    backgroundColor: "#F4A896",
                                    borderRadius: "25px",
                                }}
                            >
                                Log In
                            </Button>
                        </div>
                        <div
                            className={`${classes.marginTop} ${classes.fullWidth} ${classes.centralise}`}
                        >
                            <Link
                                component={RouterLink}
                                to="/signup"
                                className={`${classes.signUpLink}`}
                            >
                                New Prep-er? Click here to sign up!
                            </Link>
                        </div>
                        <Dialog open={isDialogOpen} onClose={closeDialog}>
                            <DialogTitle>{dialogTitle}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {dialogMsg}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeDialog}>Done</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </div>
            </Box>
        </div>
    );
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired,
};

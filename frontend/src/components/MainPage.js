import Cookies from "universal-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getCollabDetails } from "../client/client.js";
import LoginPage from "./LoginPage";
import MatchingPage from "./MatchingPage";
import validateToken from "./validate-token";
import QuestionAdminPage from "./QuestionAdminPage";

function MainPage() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(cookies.get("access token"));
    const [username, setUsername] = useState("");
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
            getCollabDetails(username);
            const details = JSON.parse(localStorage.getItem("globalVariable"));
            if (details !== null) {
                navigate("/collab");
            }
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
        localStorage.removeItem("globalVariable");
        window.location.reload(false);
    };

    const handleDeleteAccount = async () => {
        const instance = createAxiosHeader();
        if (!username || username === "") {
            console.log("No username initialised, please relogin...");
            window.location.reload(false);
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

    const handleChangePassword = async (
        oldpassword,
        newpassword,
        verifynewpassword
    ) => {
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
                    setOpenDialog(false);
                    triggerSuccessNotification();
                } else {
                    triggerFailureNotification();
                }
            })
            .catch((err) => {
                if (
                    err.response.status ===
                    STATUS_CODE_CHANGE_PASSWORD_INVALID_CRED
                ) {
                    triggerFailureNotification("wrong-old-password");
                } else {
                    console.log("Error at handleChangePW: ", err.toJSON());
                }
            });
    };

    const triggerSuccessNotification = () => {
        setOpenSuccessNotification(true);
    };

    const triggerFailureNotification = (type) => {
        setFailureType(type);
        setOpenFailureNotification(true);
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
    ) : username === "admin" ? (
        <QuestionAdminPage
            cookies={cookies}
            createAxiosHeader={createAxiosHeader}
            handleLogout={handleLogout}
        />
    ) : (
        <MatchingPage
            handleLogout={handleLogout}
            handleDeleteAccount={handleDeleteAccount}
            handleChangePassword={handleChangePassword}
            username={username}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            openConfirmation={openConfirmation}
            setOpenConfirmation={setOpenConfirmation}
            openSuccessNotification={openSuccessNotification}
            setOpenSuccessNotification={setOpenSuccessNotification}
            openFailureNotification={openFailureNotification}
            setOpenFailureNotification={setOpenFailureNotification}
            failureType={failureType}
            setFailureType={setFailureType}
        />
    );
}

export default MainPage;

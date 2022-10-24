import {
    Box,
    Button,
    Typography,
    TextField,
    Stack
} from "@mui/material";
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import { useState } from 'react'
import axios from "axios";
import { URL_USER_LOGOUT, URL_USER_DELETE, URL_USER_GET_USERNAME, URL_USER_CHANGE_PASSWORD } from "../configs";
import { STATUS_CODE_DELETE_USER_SUCCESS, STATUS_CODE_CHANGE_PASSWORD_SUCCESS, STATUS_CODE_CHANGE_PASSWORD_INVALID_CRED } from "../constants";
import LoginPage from "./LoginPage";
import MatchingPage from "./MatchingPage";
import validateToken from "./validate-token";

function MainPage() {
    const cookies = new Cookies()
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(cookies.get('access token'))
    const [username, setUsername] = useState("")
    const [oldpassword, setOldPw] = useState("")
    const [newpassword, setNewPw] = useState("")
    const [verifynewpassword, setVerifyNewPw] = useState("")

    if (!token){
        return <LoginPage setToken={setToken} />;
    } 

    validateToken(token).then(tokenValid => {
        console.log("verifying token")
        if (!tokenValid){
            console.log("invalid token")
            cookies.remove('access token')
            setIsLogin(false)
        } else {
            console.log("valid token")
            setIsLogin(true)
            initialiseUsername()
        }
    })

    const initialiseUsername = () => {
        const instance = createAxiosHeader();
        instance.post(URL_USER_GET_USERNAME)
                .then(res => {setUsername(res.data.username)})
                .catch((err) => {console.log("Error getting username from cookie: ", err.toJSON())})
    }

    const handleLogout = async () => {
        const instance = createAxiosHeader();
        await instance.post(URL_USER_LOGOUT)
            .then(res => {})
            .catch((err) => {})
        cookies.remove('access token')
        //setIsLogin(false)
        window.location.reload(false)
    }

    const handleDeleteAccount = async () => {
        const instance = createAxiosHeader();
        if (!username || username === "") {
            console.log("No username initialised, please relogin...")
            return;
        }
        
        await instance.post(URL_USER_DELETE, { username })
            .then(res =>{
                if (res && res.status === STATUS_CODE_DELETE_USER_SUCCESS) {
                    console.log("Delete user successful!")
                } else {
                    console.log("Delete user failure!")
                }
            })
            .catch((err) => {
                console.log("Error at handleDeleteAccount: ", err.toJSON())
            })
        handleLogout()
    }

    const handleChangePassword = async () => {

        if (!newpassword || newpassword == "" || !oldpassword || oldpassword == "" || !verifynewpassword || verifynewpassword == ""){
            console.log("All fields are required");
            alert("All fields are required.");
            return;
        }
        
        if (newpassword !== verifynewpassword){
            console.log("New passwords do not match. Please retype your new passwords.");
            alert("New passwords do not match. Please retype your new passwords.");
            resetPasswordFields();
            return;
        }

        const instance = createAxiosHeader();
        await instance.post(URL_USER_CHANGE_PASSWORD, 
            {   
                username: username,
                oldpassword: oldpassword,
                newpassword: newpassword 
            }).then(res =>{
                if (res && res.status === STATUS_CODE_CHANGE_PASSWORD_SUCCESS) {
                    console.log("Password successfully changed!")
                    alert("Password successfully changed!")
                    resetPasswordFields()                    
                } else {
                    console.log("Unable to change password")
                    alert("Unable to change password, please try again later")
                    resetPasswordFields()
                }
            })
            .catch((err) => {
                if (err.response.status == STATUS_CODE_CHANGE_PASSWORD_INVALID_CRED){
                    console.log("Unable to verify current password. Please try again.")
                    alert("Unable to verify current password. Please try again.")
                    resetPasswordFields()
                }
                else {
                    console.log("Error at handleChangePW: ", err.toJSON())
                }
            })
    }

    const resetPasswordFields = () => {
        setOldPw("")
        setNewPw("")
        setVerifyNewPw("")

    }

    function createAxiosHeader() {
        const jwt = cookies.get('access token');
        const instance = axios.create({
            headers: {
                'Authorization': jwt
            }
        });
        return instance;
    }

    return (
        !isLogin 
        ?   <LoginPage setToken={setToken} />
        :   <div>
                <Box display={"flex"} flexDirection={"column"} width={"50%"}>
                    <Typography variant={"h3"} marginBottom={"2rem"}>Loggged In Succesfully!</Typography>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"centre"}>
                    {isLogin
                        ? <Typography variant={"h5"} marginBottom={"2rem"}>Valid Token</Typography>
                        : <Typography variant={"h5"} marginBottom={"2rem"}>Invalid Token</Typography>
                    }
                    </Box>
                </Box>
                <p>
                    <Button variant={"outlined"} onClick={handleLogout} component={Link} to="/mainpage">Log Out</Button>
                    <Button variant={"outlined"} onClick={handleDeleteAccount} component={Link} to="/mainpage">Delete User</Button>
                    <Button variant={"outlined"} onClick={handleChangePassword} >Change Password</Button>
                </p>
                <div>
                    <Stack spacing={2} width={400}>
                            <TextField fullwidth id="oldpw" label="Old Pasword" variant="outlined" type="password" value={oldpassword} onChange={(e) => setOldPw(e.target.value)} ></TextField>
                            <TextField fullwidth id="newpw" label="New Password" variant="outlined" type="password" value={newpassword} onChange={(e) => setNewPw(e.target.value)} ></TextField>
                            <TextField fullwidth id="verifynewpw" label="Retype New Password" variant="outlined" type="password" value={verifynewpassword} onChange={(e) => setVerifyNewPw(e.target.value)}></TextField>
                    </Stack>
                </div>
            </div>
    )
}

export default MainPage;

import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import { useState } from 'react'
import axios from "axios";
import { URL_USER_LOGOUT, URL_USER_DELETE, URL_USER_GET_USERNAME } from "../configs";
import { STATUS_CODE_DELETE_USER_SUCCESS } from "../constants";
import LoginPage from "./LoginPage";
import MatchingPage from "./MatchingPage";
import validateToken from "./validate-token";

function MainPage() {
    const cookies = new Cookies()
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(cookies.get('access token'))
    const [username, setUsername] = useState("")

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
        :   <MatchingPage
                handleLogout={handleLogout}
                handleDeleteAccount={handleDeleteAccount}
                username={username}/>
    )
}

export default MainPage;

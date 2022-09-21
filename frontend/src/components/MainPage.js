import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import React, { useState } from 'react'
import axios from "axios";
import { URL_USER_LOGOUT, URL_USER_DELETE } from "../configs";
import LoginPage from "./LoginPage";
import validateToken from "./validate-token";

function MainPage() {
    const cookies = new Cookies()
    const [isLogin, setIsLogin] = React.useState(false)
    const [token, setToken] = useState(cookies.get('access token'))

    if (!token){
        return <LoginPage setToken={setToken} />
    }

    console.log(`main page: ${token}`)
    validateToken(token).then(tokenValid => {
        console.log("verifying token")
        if (!tokenValid){
            console.log("invalid token")
            cookies.remove('access token')
            setIsLogin(false)
        } else {
            console.log("valid token")
            setIsLogin(true)
        }
    })

    const handleLogout = async () => {
        const instance = createAxiosHeader();
        const res = await instance.post(URL_USER_LOGOUT).catch((err) => {})
        cookies.remove('access token')
        //setIsLogin(false)
        window.location.reload(false)
    }

    const handleDeleteAccount = async () => {
        const username = cookies.get('username')
        const instance = createAxiosHeader();
        const res = await instance.post(URL_USER_DELETE, { username })
            .catch((err) => {
                console.log("Error at handleDeleteAccount")
            })

        console.log("RES IS", res)
        if (res && res.status === 202) {
            console.log("SUCCESS")
        } else {
            console.log("FAILURE")
        }
        handleLogout()
    }

    function createAxiosHeader() {
        const jwt = cookies.get('access token')
        const instance = axios.create({
            headers: {
                'Authorization': jwt
            }
        })

        return instance
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
                </p>
            </div>
    )
}

export default MainPage;
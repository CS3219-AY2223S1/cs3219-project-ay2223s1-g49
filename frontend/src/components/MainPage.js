import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import React, { useState } from 'react'
import axios from "axios";
import { URL_USER_LOGOUT } from "../configs";
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
        
        const jwt = cookies.get('access token')
        cookies.remove('access token')


        console.log(`logout ${jwt}`)
        const instance = axios.create({
            headers: {
                'Authorization': jwt
            }
        })
        const res = await instance.post(URL_USER_LOGOUT).catch((err) => {})
        setIsLogin(false)
        window.location.reload(false)
    }

    return (
        !isLogin 
        ?  <LoginPage setToken={setToken} /> : 
         <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Loggged In Succesfully!</Typography>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogout} component={Link} to="/mainpage">Log Out</Button>
                {isLogin
                        ? <Typography variant={"h5"} marginBottom={"2rem"}>Valid Token</Typography>
                        : <Typography variant={"h5"} marginBottom={"2rem"}>Invalid Token</Typography>
                    }
            </Box>
        </Box>
    )
}

export default MainPage;
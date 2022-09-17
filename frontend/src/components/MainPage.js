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

//import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.JWT_TEST_KEY

function MainPage() {
    const cookies = new Cookies()
    const [isLogin, setIsLogin] = React.useState(false)
    const [token, setToken] = useState(cookies.get('access token'))

    if (!token){
        return <LoginPage setToken={setToken} />
    }

    validateToken(token).then(tokenValid => {
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

        const res = await axios.post(URL_USER_LOGOUT, { token: jwt })
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
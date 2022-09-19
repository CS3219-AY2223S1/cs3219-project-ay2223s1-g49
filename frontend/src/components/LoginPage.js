import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import Cookies from 'universal-cookie';
import {useState} from "react";
import axios from "axios";
import {URL_USER_LOGIN} from "../configs";
import { STATUS_CODE_LOGIN_SUCCESS } from "../constants";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

export default function LoginPage({ setToken }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)
    const storedJwt = new Cookies().get('access token')
    const [jwt, setJwt] = useState(storedJwt || null);

    const handleLogin = async () => {
        setIsLoginSuccess(false)
        if (username==="" || password===""){
            setErrorDialog('Username or Password is missing!')
            return
        }
        const res = await axios.post(URL_USER_LOGIN, { username, password })
            .catch((err) => {
                setErrorDialog('Login failed! Please check your Username and Password!')
                return
            })
        if (res && res.status === STATUS_CODE_LOGIN_SUCCESS) {
            setJwt(res.data.token)
            
            const cookies = new Cookies();
            cookies.set('access token', res.data.token, { path: '/', expires: new Date(Date.now()+86400000) }); // token expires in a day(86400000 ms)
            console.log("cookie returned")
            console.log(cookies.get("access token")); 
            setToken(res.data.token)
            setIsLoginSuccess(true)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Success')
        setDialogMsg(msg)
    }

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Log In</Typography>
            <TextField
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{marginBottom: "2rem"}}
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} component={Link} to="/signup">Sign Up</Button>
                <Button variant={"outlined"} onClick={handleLogin}>Log In</Button>
            </Box>

            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Done</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

    
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
  }
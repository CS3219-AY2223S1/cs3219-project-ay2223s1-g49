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
import {useState} from "react";
import axios from "axios";
import {URL_USER_SIGNUP} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED, STATUS_CODE_MISSING_PARAM, STATUS_CODE_UNKNOWN_ERROR} from "../constants";
import {Link as RouterLink} from "react-router-dom";

import Link from '@mui/material/Link';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import background from './center-logo.png'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
    container: {
        display:"flex",
        alignSelf:"center",
        justifyContent:"center",
        backgroundColor: '#F0F0F0',
        height: '100%',
        width: '100%',
    },
    boxPadding: {
        display:"flex",
        flexDirection:"column",
        margin:"15vh auto auto auto",
        height:"70%",
        minWidth:"40vh",
        backgroundColor:"white",
        alignItems:"center"
    },
    textfieldAlignment: {
        display: 'flex',
        padding: "1rem 0 1rem 0",
        justifyContent:"center",
        gap:"0.5rem"
    },
    paddingTop: {
        paddingTop:"2rem",
        width:"100%",
        textAlign:"center"
    }
})

function SignupPage() {
    const [email, setEmail] = useState("")    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    const handleSignup = async () => {
        setIsSignupSuccess(false)
        const res = await axios.post(URL_USER_SIGNUP, { username, password })
            .catch((err) => {
                console.log(err)
                
                switch(err.response.status) {
                    case STATUS_CODE_CONFLICT:
                        setErrorDialog('This username already exists');
                        break;
                    case STATUS_CODE_MISSING_PARAM:
                        setErrorDialog('Username/Password field is missing');
                        break;
                    case STATUS_CODE_UNKNOWN_ERROR:
                        setErrorDialog('Unknown error occured, please contact developers');
                        break;
                    default:
                        setErrorDialog('Please try again later')
                        break;
                }
            })
        if (res && res.status === STATUS_CODE_CREATED) {
            setSuccessDialog('Account successfully created')
            setIsSignupSuccess(true)
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

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Box className={classes.boxPadding} sx={{ boxShadow: 10, borderRadius: 2}}>
                <div style={{backgroundImage:`url(${background})`, backgroundRepeat: "no-repeat", height:"25%", width:"100%", backgroundSize:"cover", backgroundPosition:"center", borderRadius:"8px 8px 0 0"}}></div>
                <div className={classes.paddingTop}>
                    <div className={classes.textfieldAlignment}>
                        <EmailIcon style={{"width": "10%", "paddingTop": "0.5rem", "color": "gray"}}/>
                        <TextField
                            placeholder="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ width: "75%"}}
                            autoFocus
                        />                    
                    </div>

                    <div className={classes.textfieldAlignment}>
                        <PeopleAltIcon style={{"width": "10%", "paddingTop": "0.5rem", "color": "gray"}}/>
                        <TextField
                            placeholder="Username"
                            variant="standard"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ width: "75%"}}
                            autoFocus
                        />                    
                    </div>
                    
                    <div className={classes.textfieldAlignment}>
                        <LockIcon style={{"width": "10%", "paddingTop": "0.5rem", "color": "gray"}}/>
                        <TextField
                            placeholder="Password"
                            variant="standard"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ width: "75%"}}
                        />                
                    </div>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} padding={"2rem 0 1rem 0"} width={"100%"}>                    
                        <Button variant={"contained"} onClick={handleSignup} sx={{width: "40%", backgroundColor: "#F4A896"}}>Sign up</Button>
                    </Box>
                    <Link component={RouterLink} to="/mainpage" fontSize={"small"} color={"#40AEDB"}>
                        Click here to login!
                    </Link>                                        
                </div>

                <Dialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                >
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialogMsg}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {isSignupSuccess
                            ? <Button component={Link} to="/mainpage">Log in</Button>
                            : <Button onClick={closeDialog}>Done</Button>
                        }
                    </DialogActions>
                </Dialog>
            </Box>            
          </div>
    )
}

export default SignupPage;

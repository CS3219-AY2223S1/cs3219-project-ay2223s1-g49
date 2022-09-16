import {
    AppBar,
    Button,
    Toolbar
} from "@mui/material";
import logo from "../images/peerprep.png"
import '../styles/NavBar.css';

function NavBar() {
    return (
        <div>
            <AppBar position="static" sx={{backgroundColor: "white", boxShadow: "0 1 0 black"}}>
                <Toolbar className="logo-container">
                     <img className="logo" src={logo} alt="Logo" />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

function MainPage() {
    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Loggged In Succesfully!</Typography>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} component={Link} to="/login">Log Out</Button>
            </Box>
        </Box>
    )
}

export default MainPage;
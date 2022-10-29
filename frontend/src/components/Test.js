import {
    Box,
    Button,
    Container,
    TextField
} from "@mui/material";
import React from "react";
import {findMatch,runCollabService} from "../client/client.js"
import RealTimeEditor from "../client/realTimeEditor.jsx"

function Test() {

    React.useEffect(() => {
       const params = new URLSearchParams(window.location.search)
       runCollabService(params.get("cid"), params.get("username"), params.get("difficulty"));
    }, [])

    return (
        <Container>
            <Box sx={{ width: 500, maxWidth: '100%'}}>
                <TextField fullWidth label="fullWidth" id="fullWidth" />
            </Box>
            <Button variant="contained" onClick={()=> {findMatch("mr buttons", "easy")}}>Button 1</Button>
            <Button variant="contained" onClick={()=> {findMatch("bear lair", "easy")}}>Button 2</Button>
            <Button variant="contained" onClick={()=> {findMatch("james", "harder")}}>Button 1</Button>
            <Button variant="contained" onClick={()=> {findMatch("zoomer", "harder")}}>Button 2</Button>
            <RealTimeEditor/>
        </Container>

    );

}

export default Test;
import {
    Box,
    Button,
    Container,
    TextField
} from "@mui/material";
import React from "react";
import {findMatch} from "../client/client.js"
import RealTimeEditor from "../client/realTimeEditor.jsx"

function Test() {

    return (
        <Container>
            <Box sx={{ width: 500, maxWidth: '100%'}}>
                <TextField fullWidth label="fullWidth" id="fullWidth" />
            </Box>
            <Button variant="contained" onClick={()=> {findMatch("button11", "ezz")}}>Button 1</Button>
            <Button variant="contained" onClick={()=> {findMatch("button22", "ezz")}}>Button 2</Button>
            <Button variant="contained" onClick={()=> {findMatch("james", "harder")}}>Button 1</Button>
            <Button variant="contained" onClick={()=> {findMatch("zoomer", "harder")}}>Button 2</Button>
            <RealTimeEditor/>
        </Container>

    );

}

export default Test;
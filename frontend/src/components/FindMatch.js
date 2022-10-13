import {
    Autocomplete,
    Button,
    Card,
    Tabs,
    Tab,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    CircularProgress
} from "@mui/material";
import React from "react";
import TabPanel from "./TabPanel.js"
import DropDown from "./DropDown.js"
import '../styles/FindMatch.css';

import {findMatch} from "../client/client.js"

function FindMatch() {

    const [level, setLevel] = React.useState("1");

    const handleLevelChange = (event: React.SyntheticEvent, newValue: number) => {
       setLevel(newValue);
    };

    return (
        <Card sx={{width:400, maxWidth: 450, maxHeight: 345}}>
            <Tabs value={level} onChange={handleLevelChange} centered>
                <Tab label="Easy" value="1"/>
                <Tab label="Intermediate" value="2"/>
                <Tab label="Difficult" value="3"/>
            </Tabs>
            <TabPanel value={level} index={1}>
                <div className="mode-container">
                    <h2> EASY MODE</h2>
                    <small> "Don't worry! Small steps can produce great results too!" </small>
                    <h6>I am willing to wait for ... </h6>
                    <div> <DropDown/> </div>
                    <div>
                        <Button
                            variant="contained"
                            sx={{ width: 200, padding: 1, margin: 2 }}
                            onClick={() => {setLevel(4); findMatch("saul", "hard af")}}>
                            Find A Match
                        </Button>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={level} index={2}>
                <div className="mode-container">
                    <h2> INTERMEDIATE MODE </h2>
                    <small> "Insert Quote" </small>
                    <h6>I am willing to wait for ... </h6>
                    <div> <DropDown/> </div>
                    <div>
                        <Button
                            variant="contained"
                            sx={{ width: 200, padding: 1, margin: 2 }}
                            onClick={() => {setLevel(4)}}>
                            Find A Match
                        </Button>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={level} index={3}>
                <div className="mode-container">
                    <h2> DIFFICULT MODE </h2>
                    <small> "Insert Quote" </small>
                    <h6>I am willing to wait for ... </h6>
                    <div> <DropDown/> </div>
                    <div>
                        <Button
                            variant="contained"
                            sx={{ width: 200, padding: 1, margin: 2 }}
                            onClick={() => {setLevel(4)}}>
                            Find A Match
                        </Button>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={level} index={4}>
                <div className="mode-container">
                    <div> <CircularProgress sx={{padding: 1, margin: 2}}/> </div>
                    <small> "Finding a match for you. Sit Tight!" </small>
                </div>
            </TabPanel>
        </Card>
    )
}


export default FindMatch;
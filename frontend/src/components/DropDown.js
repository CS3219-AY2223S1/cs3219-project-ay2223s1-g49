import {
    AppBar,
    Button,
    Toolbar,
    FormControl,
    MenuItem,
    Select,
    InputLabel
} from "@mui/material";
import React from "react";

function DropDown() {
    const [value, setValue] = React.useState('30');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <FormControl sx={{width: 250}}>
            <InputLabel>Time (in seconds)</InputLabel>
            <Select value={value} label="Time (in seconds)" onChange={handleChange}>
                <MenuItem value={30}>30s</MenuItem>
                <MenuItem value={60}>60s</MenuItem>
                <MenuItem value={90}>90s</MenuItem>
            </Select>
        </FormControl>
    )
}

export default DropDown;
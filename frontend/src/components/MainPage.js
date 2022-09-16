import React from 'react';
import NavBar from "./NavBar"
import FindMatch from "./FindMatch"
import '../styles/MainPage.css';

function MainPage() {

    const [level, setLevel] = React.useState('2');

    const handleLevelChange = (event: React.SyntheticEvent, newValue: number) => {
       setLevel(newValue);
    };

    return (
        <div className="main-container">
            <NavBar/>
            <div className="body-container">
                <FindMatch/>
            </div>
        </div>
    )
}


export default MainPage;

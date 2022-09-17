import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import MainPage from "./components/MainPage";
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/mainpage" />}></Route>
                        {/* <Route path="/login" element={<LoginPage/>}/> */}
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/mainpage" element={<MainPage/>}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;

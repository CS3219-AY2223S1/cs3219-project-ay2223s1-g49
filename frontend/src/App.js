import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import MainPage from "./components/MainPage";
import MatchingPage from "./components/MatchingPage";
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} backgroundColor={'#F0F0F0'} height={'100%'}>
                <Router>
                    <Routes>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/mainpage" element={<MainPage/>}/>
                        <Route path="/match" element={<MatchingPage/>}/>
                        <Route path="/*" element={<Navigate replace to="/mainpage" />}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;

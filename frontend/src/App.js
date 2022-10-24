import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import MainPage from "./components/MainPage";
import CollabPage from "./components/CollabPage";
import FindMatch from "./components/FindMatch";
import Test from "./components/Test";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} backgroundColor={'#F0F0F0'} height={'100%'}>
                <Router>
                    <Routes>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/mainpage" element={<MainPage/>}/>
                        <Route path="/collab" element={<CollabPage/>}/>
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/*" element={<Navigate replace to="/mainpage" />}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;

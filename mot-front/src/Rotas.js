import { Routes, Route } from "react-router-dom";

import Video from "./pages/Video/Video";
import Login from "./pages/Login/Login";
import LoginChecker from "./pages/Login/CheckLogin";
import Upload from "./pages/Upload/Upload";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Head from "./components/Head";
import Register from "./pages/Register/Register";

function Rotas() {
    return (
        <Routes>
            <Route path="/video" element={
                <>
                    <Head/>
                    <Video />
                </>
            } />
            <Route path="/" element={<LoginChecker />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={
                <>
                <Head/>
                <Upload />
            </>
            } />
            <Route path="/main" element={
                <>
                <Head/>
                <Main />
            </>
            }/>
            <Route path="/profile" element={
                <>
                <Head/>
                <Profile />
            </>
            }/>
            <Route path="/register" element={<Register />} />
        </Routes>
		);
}

export default Rotas;
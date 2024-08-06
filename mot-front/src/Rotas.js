import { Routes, Route } from "react-router-dom";

import Video from "./pages/Video/Video";
import Login from "./pages/Login/Login";
import LoginChecker from "./pages/Login/CheckLogin";
import Upload from "./pages/Upload/Upload";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Head from "./components/Head";
import Register from "./pages/Register/Register";

function Layout({ children }) {
    return (
        <>
            <Head />
            {children}
        </>
    );
}

function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<LoginChecker />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/video" element={
                <Layout>
                    <Video />
                </Layout>
            } />
            <Route path="/upload" element={
                <Layout>
                    <Upload />
                </Layout>
            } />
            <Route path="/main" element={
                <Layout>
                <Main/>
                </Layout>
            } />
            <Route path="/profile" element={
                <Layout>
                    <Profile />
                </Layout>
            } />
        </Routes>
    );
}

export default Rotas;

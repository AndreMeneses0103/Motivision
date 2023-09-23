import { Routes, Route } from "react-router-dom";

import Video from "./pages/Video";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Main from "./pages/Main";
import Profile from "./pages/Profile";

function Rotas() {
    return (
        <Routes>
            <Route path="/video" element={<Video />} />
            <Route path="/" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/main" element={<Main/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
		);
}

export default Rotas;
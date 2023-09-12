import { Routes, Route } from "react-router-dom";

import Video from "./Video";
import Login from "./Login";
import Upload from "./Upload";
import Main from "./Main";

function Rotas() {
    return (
        <Routes>
            <Route path="/video" element={<Video />} />
            <Route path="/" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/main" element={<Main/>}/>
        </Routes>
		);
}

export default Rotas;
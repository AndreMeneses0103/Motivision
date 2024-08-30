import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Head.css";
import { useUser } from "../contexts/UserContext";

function Head() {
    const {user, loading, error} = useUser();
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    const loadUpload = () => {
        navigate("/upload");
        setShowOptions(false);
    };

    const loadProfile = () => {
        navigate(`/profile?user=${user.usersettings.userid}`);
        setShowOptions(false);
    };

    const loadMain = () => {
        navigate("/main");
        setShowOptions(false);
    };

    const logout = () => {
        
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    if(user){
        return (
            <div className="header">
                    <div className="user" id="user">
                        <button className="btn_profile" onClick={toggleOptions}>
                        {loading ? (
                            <img
                                id="userphoto"
                                itemID="userphoto"
                                src="../icons/loading.gif"
                                alt="User Profile"
                            />
                        ):(
                            <img
                                id="userphoto"
                                itemID="userphoto"
                                src={`data:image/png;base64,${user.userphoto}`}
                                alt="User Profile"
                            />
                        )}
                        
                        </button>
                    </div>
                    {showOptions && (
                        <div className="balloon">
                            <button onClick={loadProfile}>View Profile</button>
                            <button onClick={logout}>Logout</button>
                        </div>
                    )}
                <div className="logo">
                    <button className="btn_logo" onClick={loadMain}>
                        Motivision
                    </button>
                </div>
                <div className="upload_div">
                    <button id="upload_btn" onClick={loadUpload}>
                        <img
                            id="upload_img"
                            src="../icons/upload.png"
                            alt="Upload Button"
                        />
                    </button>
                </div>
            </div>
        );
    }else{
        console.error(error);
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    }
}

export default Head;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import {refreshToken, getTokenId, refreshCookieValue } from "../scripts/getUser";
import "../styles/Head.css";
import { getUser } from "../services/userFetch";

function Head() {
    // const [userData, setUserData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    async function getUserData(){
        const userSelected = getTokenId(refreshToken());
        let data = await getUser(userSelected);
        if (data.isValid && "newAccessToken" in data.isValid) {
            refreshCookieValue("accessToken",data.isValid.newAccessToken);
            data = await getUser(userSelected);
        }
        setUser(data.user)
    }

    async function tryGetUser(){
        try {
            await getUserData();
        } catch(error){
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await tryGetUser();
        })();
    },[])

    const loadUpload = () => {
        navigate("/upload");
    };

    const loadProfile = () => {
        navigate(`/profile?user=${getTokenId(refreshToken())}`);
    };

    const loadMain = () => {
        navigate("/main");
    };

    if (error) {
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    } else {
        return (
            <div className="header">
                    <div className="user" id="user">
                        <button className="btn_profile" onClick={loadProfile}>
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
                                src={`data:image/png;base64,${user.photo}`}
                                alt="User Profile"
                            />
                        )}
                            
                        </button>
                    </div>
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
    }
}

export default Head;

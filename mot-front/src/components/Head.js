import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { accessToken, refreshToken } from "../scripts/getUser";

import "./Head.css";

function Head() {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `${accessToken()}`,
                    "Refresh-Token": `${refreshToken()}`,
                };
                const resp = await axios.get(
                    "http://192.168.15.146:8080/user/getIdInfo",
                    { headers: headers }
                );

                let user_log = resp.data;
                console.log("ALL VIDEOS:", user_log);
                if (
                    user_log.isValid &&
                    "newAccessToken" in user_log.isValid
                ) {
                    atualizarValorCookie(
                        "accessToken",
                        user_log.isValid.newAccessToken
                    );
                    await fetchData();
                } else {
                    setUserData(user_log.users);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError(err);
            }
        };

        fetchData();
    }, []);

    const loadUpload = () => {
        navigate("/upload");
    };

    const loadProfile = () => {
        navigate("/profile");
    };

    const loadMain = () => {
        navigate("/main");
    };

    const atualizarValorCookie = (nomeCookie, novoValor) => {
        var todosCookies = document.cookie;
        var cookiesArray = todosCookies.split(";");

        for (var i = 0; i < cookiesArray.length; i++) {
            var cookie = cookiesArray[i].trim();

            if (cookie.startsWith(nomeCookie + "=")) {
                document.cookie = nomeCookie + "=" + novoValor;
                return;
            }
        }

        document.cookie = nomeCookie + "=" + novoValor;
    };

    if (error) {
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    } else {
        console.log("USER DATA:",userData);
        return (
            <div className="header">
                    <div className="user" id={userData.id}>
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
                                src={`data:image/png;base64,${userData._userphoto}`}
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

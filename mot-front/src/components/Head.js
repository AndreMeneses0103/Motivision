import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { accessToken, refreshToken, getTokenId, refreshCookieValue } from "../scripts/getUser";
import "./Head.css";
import { getUser, verifyLog } from "../services/userFetch";

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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const userSelected = getTokenId(refreshToken());
    //             const headers = {
    //                 "Content-Type": "application/json",
    //                 Authorization: `${accessToken()}`,
    //                 "Refresh-Token": `${refreshToken()}`,
    //             };
    //             const resp = await axios.get(
    //                 `http://192.168.15.146:8080/user/getIdInfo?user=${userSelected}`,
    //                 { headers: headers }
    //             );

    //             let user_log = resp.data;

    //             if (
    //                 user_log.isValid &&
    //                 "newAccessToken" in user_log.isValid
    //             ) {
    //                 refreshCookieValue(
    //                     "accessToken",
    //                     user_log.isValid.newAccessToken
    //                 );
    //                 await fetchData();
    //             } else {
    //                 setUserData(user_log.users);
    //                 setLoading(false);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //             setError(err);
    //         }
    //     };

    //     fetchData();
    // }, []);

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

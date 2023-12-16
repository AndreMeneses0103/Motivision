import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {accessToken, refreshToken, refreshCookieValue} from "../../scripts/getUser";
import axios from "axios";

function Videos({id, src, video}){

    const navigate = useNavigate();

    function loadVideo (link){
        navigate(`/video?videoId=${link}`);
    }

    return(
        <div className="mvid" id={id}>
            <button className="vidButton" onClick={()=>loadVideo(video)}>
                <img
                    src={src}
                    className="vidImage"
                    alt="Imagem do video"
                ></img>
            </button>
        </div>
    );
}

function ProfilePhoto({imageSrc}){
    return(
        <div className="user_photo">
                <button type="button" className="photo_btn">
                    <img
                    id="profile_photo"
                    itemID="profile_photo"
                    src={`data:image/png;base64,${imageSrc}`}
                    alt="Foto do Usuario"
                    />
                </button>
            </div>
    )
}

function GetPhoto(){
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
                    refreshCookieValue(
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

    if (error) {
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    } else {
        console.log("USER DATA:",userData);
        return (
            <ProfilePhoto imageSrc={userData.photo}/>
        );
    }
}

function ProfileVideos(){
    const data = [
        {id: "", src:"./images/image1.jpg", video: 'video1'},
        {id: "", src:"./images/image2.jpg", video: 'video2'},
        {id: "", src:"./images/image3.jpg", video: 'video1'},
        {id: "", src:"./images/image4.jpg", video: 'video2'},
        {id: "", src:"./images/image2.jpg", video: 'video1'},
        {id: "", src:"./images/image3.jpg", video: 'video2'},
    ];

    for(let x = 0; x < data.length; x++){
        data[x].id = "video" + x;
    }

    return(
        <>
            {data.map(item => (
                <Videos key={item.id} id={item.id} src={item.src} video={item.video}/>
            ))};
        </>
    );
}

export {ProfileVideos, GetPhoto};
import "./Profile.css"
import "../../components/Scroll.css"
import Head from "../../components/Head";
import {ProfileVideos, ProfilePhoto, UserInfos} from "./Profile_Videos"
import { accessToken, refreshToken, refreshCookieValue } from "../../scripts/getUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile(){
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
    if(error){
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    }else{
        const numVids = userData.videos ? userData.videos.length : 0;
        return(
            <div className="profile_main">
                <Head/>
                <div className="username">
                    Teste
                </div>
                    <ProfilePhoto imageSrc={userData.photo}/>
                <UserInfos num_subs={userData.subscribers} num_vids={numVids}/>
                <div className="user_videos">
                <div className="Profile_Videos">
                    <ProfileVideos/>
                </div>
                
                </div>
            </div>
        );
    }
}


export default Profile;
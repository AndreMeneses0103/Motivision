import "./Profile.css"
import "../../components/Scroll.css"
import Head from "../../components/Head";
import {ProfileVideos, ProfilePhoto, UserInfos} from "./Profile_Videos"
import { accessToken, refreshToken, refreshCookieValue } from "../../scripts/getUser";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

function Profile(){
    const [userData, setUserData] = useState([]);

    const [videoData, setVideoData] = useState([]);
    const [error, setError] = useState("");
    const [photoLoading, setPhotoLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    // const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = new URL(window.location.href);
                const userSelected = url.searchParams.get("user");
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `${accessToken()}`,
                    "Refresh-Token": `${refreshToken()}`,
                };
                const resp = await axios.get(
                    `http://192.168.15.146:8080/user/getIdInfo?user=${userSelected}`,
                    { headers: headers }
                );

                let user_log = resp.data;
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
                    setPhotoLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError(err);
                setPhotoLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                if (userData && Array.isArray(userData.videos)) {
                    const headers = {
                        "Content-Type": "application/json",
                        Authorization: `${accessToken()}`,
                        "Refresh-Token": `${refreshToken()}`,
                    };
                    let userVideos = userData.videos.filter(Boolean);
                    const resp = await axios.get(
                        `http://192.168.15.146:8080/video/search?videos=${userVideos.join(',')}`,
                        { headers: headers }
                    );
                    let video_log = resp.data;
                    // console.log("ALL VIDEOS:", video_log);
                    if (
                        video_log.isValid &&
                        "newAccessToken" in video_log.isValid
                    ) {
                        refreshCookieValue(
                            "accessToken",
                            video_log.isValid.newAccessToken
                        );
                        return;
                    } else {
                        setVideoData(video_log);
                        setVideoLoading(false);
                    }
                }
            } catch (err) {
                console.error(err);
                setError(err);
                setVideoLoading(false);
            }
        };
        fetchVideo();
    }, [userData]);
    if(error){
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    }else if(userData.length === 0){
        if(photoLoading){
            const numVids = userData.videos ? userData.videos.length : 0;
            return(
                <div className="profile_main">
                    <Head/>
                    <div className="username">
                        {userData.profile}
                    </div>
                        <ProfilePhoto imageSrc={"../icons/loading.gif"}/>
                    <UserInfos num_subs={userData.subscribers} num_vids={numVids}/>
                    <div className="user_videos">
                    <div className="Profile_Videos">
                        <img
                            id="video_loading"
                            itemID="video_loading"
                            src="../icons/loading.gif"
                            alt="Loading..."
                        />
                    </div>
                    </div>
                </div>
            );
        }else{
            return <h1>Cant find the user</h1>;
        }
    }else if(videoData.length === 0){
        if(videoLoading){
            const numVids = userData.videos ? userData.videos.length : 0;
            return(
                <div className="profile_main">
                    <Head/>
                    <div className="username">
                        {userData.profile}
                    </div>
                        <ProfilePhoto imageSrc={`data:image/png;base64,${userData.photo}`}/>
                    <UserInfos num_subs={userData.subscribers} num_vids={numVids}/>
                    <div className="user_videos">
                    <div className="Profile_Videos">
                        <img
                            id="video_loading"
                            itemID="video_loading"
                            src="../icons/loading.gif"
                            alt="Loading..."
                        />
                    </div>
                    </div>
                </div>
            );
        }else{
            const numVids = userData.videos ? userData.videos.length : 0;
            return(
                <div className="profile_main">
                    <Head/>
                    <div className="username">
                        {userData.profile}
                    </div>
                        <ProfilePhoto imageSrc={`data:image/png;base64,${userData.photo}`}/>
                    <UserInfos num_subs={userData.subscribers} num_vids={numVids}/>
                    <div className="user_videos">
                    <div className="Profile_Videos">
                        <h2>Error to find videos...</h2>
                    </div>
                    </div>
                </div>
            );
        }
        
    }else if (videoData.length !== 0 && userData.length !== 0){
        const numVids = userData.videos ? userData.videos.length : 0;
        return(
            <div className="profile_main">
                <Head/>
                <div className="username">
                    {userData.profile}
                </div>
                    <ProfilePhoto imageSrc={`data:image/png;base64,${userData.photo}`}/>
                <UserInfos num_subs={userData.subscribers} num_vids={numVids}/>
                <div className="user_videos">
                <div className="Profile_Videos">
                    <ProfileVideos videoData={videoData}/>
                </div>
                
                </div>
            </div>
        );
    }
}


export default Profile;
import "../../styles/Profile.css"
import "../../styles/Scroll.css"
// import Head from "../../components/Head";
import {ProfileVideos, ProfilePhoto, UserInfos} from "./Profile_Videos"
import { accessToken, refreshToken, refreshCookieValue, getTokenId } from "../../scripts/getUser";
import { useEffect, useState } from "react";
import { getUser, verifyLog } from "../../services/userFetch";
import { getAllUserVideos } from "../../services/videoFetch";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function renderVideoLoading(user){
    const numVids = user.videos ? user.videos.length : 0;
    return(
        <div className="profile_main">
            <div className="username">
                {user.nickname}
            </div>
                <ProfilePhoto imageSrc={`data:image/png;base64,${user.userphoto}`}/>
            <UserInfos num_subs={user.subscribers} num_vids={numVids}/>
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
}

function renderNoVideos(user){
    const numVids = user.videos ? user.videos.length : 0;
    return(
        <div className="profile_main">
            <div className="username">
                {user.nickname}
            </div>
                <ProfilePhoto imageSrc={`data:image/png;base64,${user.userphoto}`}/>
            <UserInfos num_subs={user.subscribers} num_vids={numVids}/>
            <div className="user_videos">
            <div className="Profile_Videos">
                <div className="no_videos">This user does not have any videos yet.</div>
            </div>
            </div>
        </div>
    );
}


function renderAllLoading(){
    return(
        <div className="profile_main">
            <div className="username">
                Loading...
            </div>
                <ProfilePhoto imageSrc={"../icons/loading.gif"}/>
            <UserInfos num_subs="x" num_vids="x"/>
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
}

function renderAllProfile(user, video){
    const numVids = video.length;
    return(
        <div className="profile_main">
            
            <div className="username">
                {user.nickname}
            </div>
                <ProfilePhoto imageSrc={`data:image/png;base64,${user.userphoto}`}/>
            <UserInfos num_subs={user.subscribers} num_vids={numVids}/>
            <div className="user_videos">
            <div className="Profile_Videos">
                <ProfileVideos videoData={video}/>
            </div>
            
            </div>
        </div>
    );
}

function renderError(message){
    return(
        <div className="profile_main">
            <div className="errorMsg">{message}</div>
        </div>
    );
}

function Profile(){
    const [user, setUser] = useState(null);
    const [video, setVideo] = useState(null);
    const [error, setError] = useState("");
    const [photoLoading, setPhotoLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    const local = useLocation();
    const params = new URLSearchParams(local.search);
    const userSelected = params.get("user");
    // const navigate = useNavigate();

    async function getUserData(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getUser(userSelected);
            if(data.user === null){
                setError("nonexistent");
            }else{
                setError("");
                setUser(data.user);
            }
        }
    }

    async function getVideoData(){
        const logUser = verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getAllUserVideos(user.videos);
            setVideo(data.videos);
        }
    }

    async function tryGetUser(){
        try{
            await getUserData();
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setPhotoLoading(false);
        }
    }

    async function tryGetVideos(){
        try{
            await getVideoData();
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setVideoLoading(false);
        }
    }

    useEffect(()=>{
        (async()=>{
            await tryGetUser();
        })();
    },[local])

    useEffect(()=>{
        (async()=>{
            if(user !== null){
                await tryGetVideos();
            }
        })();
    },[user])

    if(error){
        if (error.code === "ERR_BAD_REQUEST") {
            return renderError("Erro de autenticação, realize o login novamente.");
        }
        if(error === "nonexistent"){
            return renderError("User not found.");
        }
    }else if(user === null && video === null){
        if(photoLoading && videoLoading){
            return renderAllLoading();
        }else{
            return renderError("Um erro ocorreu no sistema, tente novamente mais tarde.");
        }
    }else if(video === null && user !== null){
        if(photoLoading && videoLoading){
            return renderAllLoading();
        }else if(!photoLoading && videoLoading){
            return renderVideoLoading(user);
        }else{
            return renderNoVideos(user);
        }
    }else{
        return renderAllProfile(user, video);
    }
}


export default Profile;
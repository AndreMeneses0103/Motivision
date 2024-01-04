import "./Profile.css"
import "../../components/Scroll.css"
// import Head from "../../components/Head";
import {ProfileVideos, ProfilePhoto, UserInfos} from "./Profile_Videos"
import { accessToken, refreshToken, refreshCookieValue, getTokenId } from "../../scripts/getUser";
// import axios from "axios";
import { useEffect, useState } from "react";
import { getUser, verifyLog } from "../../services/userFetch";
import { getAllUserVideos } from "../../services/videoFetch";
// import { useNavigate } from "react-router-dom";

function renderVideoLoading(user){
    const numVids = user.videos ? user.videos.length : 0;
    return(
        <div className="profile_main">
            <div className="username">
                {user.profile}
            </div>
                <ProfilePhoto imageSrc={`data:image/png;base64,${user.photo}`}/>
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

function renderPhotoLoading(user){
    const numVids = user.videos ? user.videos.length : 0;
    return(
        <div className="profile_main">
            <div className="username">
                {user.profile}
            </div>
                <ProfilePhoto imageSrc={"../icons/loading.gif"}/>
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

function renderAllLoading(){
    return(
        <div className="profile_main">
            <div className="username">
                Loading...
            </div>
                <ProfilePhoto imageSrc={"../icons/loading.gif"}/>
            <UserInfos num_subs="Loading..." num_vids="Loading..."/>
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

//CORRIGIR DIFERENCA DOS VIDEOS VINDO DE USUARIO E OS REAIS
function renderAllProfile(user, video){
    const numVids = video.length;
    return(
        <div className="profile_main">
            
            <div className="username">
                {user.profile}
            </div>
                <ProfilePhoto imageSrc={`data:image/png;base64,${user.photo}`}/>
            <UserInfos num_subs={user.subscribers} num_vids={numVids}/>
            <div className="user_videos">
            <div className="Profile_Videos">
                <ProfileVideos videoData={video}/>
            </div>
            
            </div>
        </div>
    );
}

function renderError(){
    return(
        <div className="profile_main">
            <h2>Nao foi possivel carregar usuario</h2>
        </div>
    );
}

function Profile(){
    const [user, setUser] = useState(null);
    const [video, setVideo] = useState(null);
    const [error, setError] = useState("");
    const [photoLoading, setPhotoLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    // const navigate = useNavigate();

    async function getUserData(){
        const url = new URL(window.location.href);
        const userSelected = url.searchParams.get("user");
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getUser(userSelected);
            setUser(data)
        }
    }

    async function getVideoData(){
        const logUser = verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getAllUserVideos(user.user.videos);
            setVideo(data);
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
    },[])

    useEffect(()=>{
        (async()=>{
            if(user !== null){
                await tryGetVideos();
            }
        })();
    },[user])

    if(error){
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    }else if(user === null && video === null){
        if(photoLoading && videoLoading){
            return renderAllLoading();
        }else{
            return renderError();
        }
    }else if(video === null && user !== null){
        if(photoLoading){
            return renderAllLoading();
        }else{
            return renderVideoLoading(user);
        }
    }else{
        return renderAllProfile(user, video);
    }
}


export default Profile;
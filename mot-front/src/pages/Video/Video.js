// import { useState } from "react";
import "../Video/Video.css";
import Head from "../../components/Head";
import AllComments from "./All_comments";
import AllVideos from "./All_Random_Videos";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { accessToken, refreshCookieValue, refreshToken,} from "../../scripts/getUser";
import axios from "axios";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";

function Video() {
    const [videoData, setVideoData] = useState([]);
    const [videoSource, setVideoSource] = useState([]);
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState("");
    const [videoLoading, setVideoLoading] = useState(true);

    const local = useLocation();
    const params = new URLSearchParams(local.search);
    const url = params.get("videoId");

    useEffect(()=>{
        const fetchVideoData = async () =>{
            try{
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `${accessToken()}`,
                    "Refresh-Token": `${refreshToken()}`,
                };
                const resp = await axios.get(
                    `http://192.168.15.146:8080/video/search?videos=${url}`,
                    { headers: headers }
                );
                let video_log = resp.data;
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
                    setVideoData(video_log.videos);
                    setVideoLoading(false);
                }
            }catch(err){
                console.error(err);
                setError(err);
                setVideoLoading(false);
            };
        }
        fetchVideoData();
    },[]);

    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                if (videoData && videoData.length > 0 && videoData[0].userid !== undefined) {
                    const headers = {
                        Authorization: `${accessToken()}`,
                        "Refresh-Token": `${refreshToken()}`,
                    };
                    const resp = await axios.get(
                        `http://192.168.15.146:8080/user/getIdInfo?user=${videoData[0].userid}`,
                        { headers: headers}
                    );
                    const user = resp.data;
                    console.table(user.users);
                    if (
                        user.isValid &&
                        "newAccessToken" in user.isValid
                    ) {
                        refreshCookieValue(
                            "accessToken",
                            user.isValid.newAccessToken
                        );
                        return;
                    } else {
                        setUserData(user.users);
                        setVideoLoading(false);
                    }
                }
            } catch (err) {
                console.error(err);
                setError(err);
                setVideoLoading(false);
            }
        };
        fetchUserData();
    }, [videoData]);
    useEffect(()=>{
        const fetchVideo = async () => {
            try {
                if (videoData) {
                    const headers = {
                        Authorization: `${accessToken()}`,
                        "Refresh-Token": `${refreshToken()}`,
                    };
                    const resp = await axios.get(
                        `http://192.168.15.146:8080/video/source?video=${url}`,
                        { headers: headers, responseType: 'blob' }
                    );
                    const video_src = new Blob([resp.data]);
                    const videoUrl = URL.createObjectURL(video_src);
                    if (
                        video_src.isValid &&
                        "newAccessToken" in video_src.isValid
                    ) {
                        refreshCookieValue(
                            "accessToken",
                            video_src.isValid.newAccessToken
                        );
                        return;
                    } else {
                        setVideoSource(videoUrl);
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
    }, [videoData]);
    if(error){
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    }else{
        if(videoSource.length === 0 || videoData.length === 0 || userData.length === 0){
            if(videoLoading){
                return (
                    <div className="mainpage">
                        <Head/>
                        <div className="video_itens">
                            <img
                                id="video_loading"
                                itemID="video_loading"
                                src="../icons/loading.gif"
                                alt="Loading..."
                            />
                        </div>
                    </div>
                );
            }else{
                return (
                    <div className="mainpage">
                        <Head/>
                        <div className="video_itens">
                            <h1>An error occurred in system. Please, try again later</h1>
                        </div>
                    </div>
                );
            }
        }else{
            if(videoSource !== undefined){
                console.log(videoData);
                const info = videoData[0];
                return (
                    <div className="mainpage">
                        <Head/>
                        <div className="video_itens">
                            <div className="video_channel">
                                <div className="channel_user">
                                    <button className="channel_btn">
                                        <img
                                            id="userphoto"
                                            itemID="userphoto"
                                            src={`data:image/png;base64,${userData.photo}`}
                                            alt="Foto do Usuario"
                                        />
                                    </button>
                                    <span id="channel_name">{userData.profile}</span>
                                </div>
                                <div className="video_subs">
                                    <button className="subs_btn">
                                        Subscribe!
                                    </button>
                                </div>
                            </div>
                            <div className="video_title">{info.title}</div>
                            <div className="screen_video">
                                <video id="playing_video" controls src={videoSource} type="video/mp4"></video>
                            </div>
                            <div className="video_stats">
                                <span className="video_icon_span"><img className="video_icons" id="view_icon" src="./icons/olho.png" alt="View"/> {info.videodata.views}</span>
                                <span className="video_icon_span"><img className="video_icons" id="like_icon" src="./icons/afirmativo.png" alt="View"/> {info.videodata.likes}</span>
                                <span className="video_icon_span"><img className="video_icons" id="dislike_icon" src="./icons/afirmativo.png" alt="View"/> {info.videodata.dislikes}</span>
                            </div>
                            <div className="video_text">
                                <span className="desc_title">Description</span>
                                <span className="desc_text">{info.description}</span>
                                <span className="desc_title">Tags</span>
                                <div className="hashtags_field">
                                    {(info.tags).map((item)=>(
                                        <span className="hashtag"><a href="https://www.spacejam.com/1996/"># {item}</a></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="recommend_video">
                            <AllVideos/>
                        </div>
                        <div className="comments_field">
                            <div className="comments_title">All Comments</div>
                            <button className="add_comment_btn">Add a comment!</button>
                            <div className="all_comments">
                                <AllComments/>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Video;

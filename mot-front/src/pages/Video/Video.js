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
//REQUISICAO PRONTA, DESENVOLVER O VIDEO NO FRONT
    const [videoData, setVideoData] = useState([]);
    const [videoSource, setVideoSource] = useState([]);
    const [error, setError] = useState("");
    const [videoLoading, setVideoLoading] = useState(true);

    const local = useLocation();
    const params = new URLSearchParams(local.search);
    const url = params.get("videoId");
    console.log("URL:",url);

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
                    console.log("VIDEO LOG:", video_log);
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
                    console.log("TIPO:",typeof video_src);
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
    }, [videoData])
    if(error){
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
    }else{
        // console.log(videoData[0]);
        // if(videoData[0]!== undefined){
        //     console.log(videoData[0].title)
        // }
        // console.log(videoSource);
        if(videoSource !== undefined){
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
                                        src="../images/spiderman.jpg"
                                        alt="Foto do Usuario"
                                    />
                                </button>
                                <span id="channel_name">Canal Teste</span>
                            </div>
                            <div className="video_subs">
                                <button className="subs_btn">
                                    Subscribe!
                                </button>
                            </div>
                        </div>
                        <div className="video_title">VIDEO TITLE</div>
                        <div className="screen_video">
                            <video id="playing_video" controls src={videoSource} type="video/mp4"></video>
                        </div>
                        <div className="video_stats">
                            <span className="video_icon_span"><img className="video_icons" id="view_icon" src="./icons/olho.png" alt="View"/> 0</span>
                            <span className="video_icon_span"><img className="video_icons" id="like_icon" src="./icons/afirmativo.png" alt="View"/> 0</span>
                            <span className="video_icon_span"><img className="video_icons" id="dislike_icon" src="./icons/afirmativo.png" alt="View"/> 0</span>
                        </div>
                        <div className="video_text">
                            <span className="desc_title">Description</span>
                            <span className="desc_text">Lorem ipsum elit nisi habitant dictumst turpis eleifend fusce, venenatis blandit diam consectetur ullamcorper pellentesque primis cubilia, nibh velit convallis praesent tortor turpis ut. dictumst metus primis cubilia curabitur condimentum pellentesque sed semper vitae, velit nulla morbi donec mi et arcu etiam, risus tincidunt fermentum rutrum id molestie elit etiam. mauris nulla condimentum duis donec adipiscing vestibulum non nec pulvinar nunc vulputate iaculis a ante, a interdum id porta fringilla turpis lorem feugiat faucibus et ullamcorper molestie. congue libero torquent iaculis consectetur nisl netus donec et, euismod mollis netus inceptos adipiscing per suscipit, mattis sapien donec ligula diam laoreet gravida. </span>
                            <span className="desc_title">Tags</span>
                            <div className="hashtags_field">
                                <span className="hashtag"><a href="https://www.spacejam.com/1996/">#yeah</a></span>
                                <span className="hashtag"><a href="https://www.spacejam.com/1996/">#nice</a></span>
                                <span className="hashtag"><a href="https://www.spacejam.com/1996/">#cool</a></span>
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
                            {/*<div className="comment" id="cm1">
                                <div className="c_profile">
                                    <button className="c_prof_btn">
                                        <img
                                            id="userphoto"
                                            itemID="userphoto"
                                            src="./images/spiderman.jpg"
                                            alt="Foto do Usuario"
                                        />
                                    </button>
                                    <span id="channel_name_prof">Canal Teste</span>
                                </div>
                                <div id="comment_text">Teste video 1</div>
                            </div>*/}
                        </div>
                    </div>
                </div>
            );
        }
    }

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
                                src="../images/spiderman.jpg"
                                alt="Foto do Usuario"
                            />
                        </button>
						<span id="channel_name">Canal Teste</span>
                    </div>
					<div className="video_subs">
						<button className="subs_btn">
							Subscribe!
						</button>
					</div>
                </div>
                <div className="video_title">VIDEO TITLE</div>
                <div className="screen_video">
                    <video id="playing_video" controls src={`./videos/${url}.mp4`}></video>
                </div>
				<div className="video_stats">
                    <span className="video_icon_span"><img className="video_icons" id="view_icon" src="./icons/olho.png" alt="View"/> 0</span>
                    <span className="video_icon_span"><img className="video_icons" id="like_icon" src="./icons/afirmativo.png" alt="View"/> 0</span>
                    <span className="video_icon_span"><img className="video_icons" id="dislike_icon" src="./icons/afirmativo.png" alt="View"/> 0</span>
				</div>
                <div className="video_text">
                    <span className="desc_title">Description</span>
                    <span className="desc_text">Lorem ipsum elit nisi habitant dictumst turpis eleifend fusce, venenatis blandit diam consectetur ullamcorper pellentesque primis cubilia, nibh velit convallis praesent tortor turpis ut. dictumst metus primis cubilia curabitur condimentum pellentesque sed semper vitae, velit nulla morbi donec mi et arcu etiam, risus tincidunt fermentum rutrum id molestie elit etiam. mauris nulla condimentum duis donec adipiscing vestibulum non nec pulvinar nunc vulputate iaculis a ante, a interdum id porta fringilla turpis lorem feugiat faucibus et ullamcorper molestie. congue libero torquent iaculis consectetur nisl netus donec et, euismod mollis netus inceptos adipiscing per suscipit, mattis sapien donec ligula diam laoreet gravida. </span>
                    <span className="desc_title">Tags</span>
                    <div className="hashtags_field">
                        <span className="hashtag"><a href="https://www.spacejam.com/1996/">#yeah</a></span>
                        <span className="hashtag"><a href="https://www.spacejam.com/1996/">#nice</a></span>
                        <span className="hashtag"><a href="https://www.spacejam.com/1996/">#cool</a></span>
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
                    {/*<div className="comment" id="cm1">
                        <div className="c_profile">
                            <button className="c_prof_btn">
                                <img
                                    id="userphoto"
                                    itemID="userphoto"
                                    src="./images/spiderman.jpg"
                                    alt="Foto do Usuario"
                                />
                            </button>
                            <span id="channel_name_prof">Canal Teste</span>
                        </div>
                        <div id="comment_text">Teste video 1</div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
}

export default Video;

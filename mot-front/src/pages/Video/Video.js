import "../../styles/Video.css";
// import Head from "../../components/Head";
import AllComments from "./All_comments";
import AllVideos from "./All_Random_Videos";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTokenId, refreshToken, refreshCookieValue} from "../../scripts/getUser";
import { getUser, postVideoView, verifyLog } from "../../services/userFetch";
import { getVideoInfo, getVideoSource } from "../../services/videoFetch";
import { Popup } from "../../components/CommentPopup";
import { setComment } from "../../services/commentFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../contexts/UserContext";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";


function Video() {

    let info = null;

    function renderLoading(){
        return(
            <div className="mainpage">
            <div className="video_itens">
            <div className="loading_space">
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
    
    function renderError(message){
        return(
            <div className="video_itens">
                <h1>{message}</h1>
            </div>
        );
    }
    
    function renderVideo(videoData,userData,videoSource){
        info = videoData[0];
        return(
            <div className="mainpage">
            {isPop ? <Popup cmtControl={closeComment} sendMessage={sendMessage} updateMessage={nextKeyComment}/> : null}
                <div className="video_itens">
                    <div className="video_channel">
                        <div className="channel_user">
                            <button className="channel_btn" onClick={loadChannel}>
                                <img
                                    id="userphoto"
                                    itemID="userphoto"
                                    src={`data:image/png;base64,${userData.userphoto}`}
                                    alt="Foto do Usuario"
                                />
                            </button>
                            <span id="channel_name">{userData.nickname}</span>
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
                    <VideoStats initialLikes={info.videodata.likes} initialDislikes={info.videodata.dislikes}/>           
                    <div className="video_text">
                        <span className="desc_title">Description</span>
                        <span className="desc_text">{info.description}</span>
                        <span className="desc_title">Tags</span>
                        <div className="hashtags_field">
                            {(info.tags).map((item)=>(
                                <span className="hashtag"><a href="https://www.spacejam.com/1996/">#{item}</a></span>
                            ))}
                        </div>
                        <ToastContainer/>
                    </div>
                </div>
                <div className="recommend_video">
                    <AllVideos/>
                </div>
                <div className="comments_field">
                    <div className="comments_title">All Comments</div>
                    <button className="add_comment_btn" onClick={()=>{
                        addNewComment();
                    }}>Add a comment!</button>
                    <div className="all_comments">
                        <AllComments key={keyComment}/>
                    </div>
                </div>
            </div>
        );
    }


    const [videoData, setVideoData] = useState(null);
    const [videoSource, setVideoSource] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [dataLoading, setDataLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    const [isPop, setIsPop] = useState(false);
    const [keyComment, setKeyComment] = useState(0);
    const navigate = useNavigate();

    const local = useLocation();
    const params = new URLSearchParams(local.search);
    const url = params.get("videoId");

    const {user: currentUser, updateUser} = useUser();

    function reset(){
        setError("");
        setVideoData(null);
        setVideoSource(null);
        setUserData(null);
        setDataLoading(true);
        setUserLoading(true);
        setVideoLoading(true);
    }

    const VideoStats = ({initialLikes, initialDislikes, alreadyLiked, alreadyDisliked}) =>{
        const [likes, setLikes] = useState(initialLikes);
        const [dislikes, setDislikes] = useState(initialDislikes);
        const [hasLiked, setHasLiked] = useState(alreadyLiked);
        const [hasDislked, setHasDisliked] = useState(alreadyDisliked);

        const likeClickEvent = ()=>{
            if(hasLiked){
                setLikes(likes - 1);
                setHasLiked(false);
            }else{
                setLikes(likes + 1);
                setHasLiked(true);
            }
        }
    
        const dislikeClickEvent = ()=>{
            if(hasDislked){
                setDislikes(dislikes - 1);
                setHasDisliked(false);
            }else{
                setDislikes(dislikes + 1);
                setHasDisliked(true);
            };
        }

        return(
            <div className="video_stats">
            <span className="video_icon_span">
                <img 
                    className="video_icons" 
                    id="view_icon" 
                    src="./icons/olho.png" 
                    alt="View"
                />
                {info.videodata.views}
            </span>
            <span className="video_icon_span">
                <button 
                    className="btn_feedback" 
                    id="btn_like" 
                    onClick={likeClickEvent}
                >
                    <img 
                        className="video_icons" 
                        id="like_icon" 
                        src="./icons/afirmativo.png" 
                        alt="Like Button"
                    />
                </button> 
                {likes}
            </span>
            <span className="video_icon_span">
                <button 
                    className="btn_feedback" 
                    id="btn_dislike" 
                    onClick={dislikeClickEvent}
                >
                    <img 
                        className="video_icons" 
                        id="dislike_icon" 
                        src="./icons/afirmativo.png" 
                        alt="Dislike Button"
                    />
                </button>
                {dislikes}
            </span>
        </div>
        )
    }


    async function getVideoData(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getVideoInfo(url);
            if(data.video === null){
                setError("nonexistent")
            }else{
                setError("");
                setVideoData(data.videos);
            }
        }
    }

    async function getUserData(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getUser(videoData[0].userid);
            if(data.user === null){
                setError("nonexistent");
            }else{
                setError("");
                setUserData(data.user);
            }
        }
    }

    async function VideoView(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            await postVideoView(url, currentUser);
            await updateUser();
        }
    }

    async function getSource(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getVideoSource(url);
            if(data.video === null){
                setError("nonexistent");
            }else{
                const video_src = new Blob([data]);
                const videoUrl = URL.createObjectURL(video_src);
                setError("");
                setVideoSource(videoUrl);
            }
        }
    }

    async function newMessage(text){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const msg = await setComment(url, text);
            if(msg){
                successToast("Comment send successfully!");
                setIsPop(false);
            }else{
                errorToast("An error occurred in comment sending...");
            }
        }
    }

    async function tryVideoView(){
        try{
            await VideoView();
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setUserLoading(false);
        }
    }

    async function tryGetVideoData(){
        try{
            await getVideoData();
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setDataLoading(false);
        }
    }

    async function tryGetUser(){
        try{
            await getUserData();
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setUserLoading(false);
        }
    }

    async function tryGetSource(){
        try{
            await getSource();
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setVideoLoading(false);
        }
    }

    async function tryNewMessage(text){
        try{
            await newMessage(text);
        }catch(error){
            console.error(error);
            errorToast();
        }finally{
            setIsPop(false);
        }
    }

    function addNewComment(){
        setIsPop(true);
    }
    function closeComment(){
        setIsPop(false);
    }

    function sendMessage(text){
        tryNewMessage(text);
    }

    const nextKeyComment = () =>{
        setKeyComment((prevKey)=> prevKey + 1); 
    }
    
    const loadChannel = () => {
        navigate(`/profile?user=${userData.usersettings._userid}`);
    };

    const errorToast = (text) =>{
		toast.error(text,{
			autoClose: 5000
		});
	}

    const successToast = (text) =>{
		toast.success(text,{
			autoClose: 1500
		});
	}

    useEffect(()=>{
        reset();
        (async()=>{
            await tryVideoView();
            await tryGetVideoData();
        })();
    },[local]);

    useEffect(()=>{
        (async()=>{
            await tryGetUser();
        })();
    },[videoData]);

    useEffect(()=>{
        (async()=>{
            await tryGetSource();
        })();
    },[local]);

    if(error){
        if (error.code === "ERR_BAD_REQUEST") {
            return <h1>Erro de autenticação, realize o login novamente.</h1>;
        }
        if(error === "nonexistent"){
            return renderError("User not found.");
        }
    }else{
        if(videoSource === null || videoData === null || userData === null){
            if(videoLoading || userLoading || dataLoading){
                return renderLoading();
            }
            else{
                //ARRUMAR ERRO APARECE NO SUCESSO
                return renderError("Um erro ocorreu no sistema, tente novamente mais tarde.");
            }
        }
        else{
            if(videoSource !== undefined){
                return renderVideo(videoData, userData, videoSource);
            }
        }
    }
}

export default Video;

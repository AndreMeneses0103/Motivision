import "../../styles/Profile.css";
import "../../styles/Scroll.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTokenId, refreshToken } from "../../scripts/getUser";
import { getUser, postSubscription, verifyLog } from "../../services/userFetch";
import { getAllUserVideos } from "../../services/videoFetch";
import { ProfilePhoto, ProfileVideos, UserInfos } from "./Profile_Videos";
import { useUser } from "../../contexts/UserContext";

function Profile() {
    const [user, setUser] = useState(null);
    const [video, setVideo] = useState(null);
    const [error, setError] = useState("");
    const [photoLoading, setPhotoLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userSelected = params.get("user");
    const [loggedUser, setLoggedUser] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    
    let { currentUser, loading, userError, updateUser } = useUser();

    async function getUserData() {
        try {
            const logUser = await verifyLog(getTokenId(refreshToken()));
            if (logUser) {
                const data = await getUser(userSelected);
                if (data.user === null) {
                    setError("nonexistent");
                } else {
                    setUser(data.user);
                }
            }
        } catch (error) {
            setError(error);
        } finally {
            setPhotoLoading(false);
        }
    }

    async function getVideoData() {
        try {
            const logUser = await verifyLog(getTokenId(refreshToken()));
            if (logUser) {
                const data = await getAllUserVideos(user.videos);
                setVideo(data.videos);
            }
        } catch (error) {
            setError(error);
        } finally {
            setVideoLoading(false);
        }
    }

    const subscribe = () =>{
        alert("hi");
    }

    const postNewSubscription = async() => {
        try{
            const logUser = await verifyLog(getTokenId(refreshToken()));
            console.log(logUser);
            if(logUser){
                currentUser = await updateUser();
                console.log(currentUser);
                if(currentUser){
                    const subs = await postSubscription(user.usersettings.userid, currentUser);
                    if(subs){
                        console.log("success");
                    }else{
                        console.log("fail");
                    }
                }
            }
        }catch(error){
            setError(error);
        }
    }

    useEffect(() => {
        (async () => {
            if(!currentUser){
                currentUser = await updateUser();
            }
            console.log(currentUser);
            if (currentUser && userSelected) {
                setLoggedUser(currentUser.usersettings.userid === userSelected);
                setSubscribed((currentUser.subscribed).includes(userSelected));
            }
        })();
    }, [location]);

    useEffect(() => {
        (async () => {
            if (userSelected) {
                await getUserData();
            }
        })();
    }, [location]);

    useEffect(() => {
        if (user) {
            (async () => {
                await getVideoData();
            })();
        }
    }, [user]);

    function renderContent() {
        if (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                return renderError("Erro de autenticação, realize o login novamente.");
            }
            if (error === "nonexistent") {
                return renderError("User not found.");
            }
        } else if (photoLoading && videoLoading) {
            return renderAllLoading(loggedUser, subscribed, postNewSubscription);
        } else if (!photoLoading && videoLoading) {
            return renderVideoLoading(user, loggedUser, subscribed, postNewSubscription);
        } else if (!video && !videoLoading) {
            return renderNoVideos(user, loggedUser, subscribed, postNewSubscription);
        } else {
            return renderAllProfile(user, video, loggedUser, subscribed, postNewSubscription);
        }
    }

    return renderContent();
}

function renderVideoLoading(user, loggedUser, subscribed, sub_function) {
    const numVids = user.videos ? user.videos.length : 0;
    return (
        <div className="profile_main">
            <div className="username">
                {user.nickname}
            </div>
            <div className="user_photo">
            <ProfilePhoto imageSrc={`data:image/png;base64,${user.userphoto}`}/>
            {!loggedUser && (
                <button className={subscribed ? "subs_btn_subscribed" : "subs_btn"} onClick={sub_function}>{subscribed ? "Subscribed" : "Subscribe!"}</button>
            )}
            </div>
            <UserInfos num_subs={user.subscribers} num_vids={numVids} />
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

function renderNoVideos(user, loggedUser, subscribed, sub_function) {
    const numVids = user.videos ? user.videos.length : 0;
    return (
        <div className="profile_main">
            <div className="username">
                {user.nickname}
            </div>
            <div className="user_photo">
                <ProfilePhoto imageSrc={`data:image/png;base64,${user.userphoto}`}/>
                {!loggedUser && (
                    <button className={subscribed ? "subs_btn_subscribed" : "subs_btn"} onClick={sub_function}>{subscribed ? "Subscribed" : "Subscribe!"}</button>
                )}
                </div>
            <UserInfos num_subs={user.subscribers} num_vids={numVids} />
            <div className="user_videos">
                <div className="Profile_Videos">
                    <div className="no_videos">This user does not have any videos yet.</div>
                </div>
            </div>
        </div>
    );
}

function renderAllLoading(loggedUser, subscribed, sub_function) {
    return (
        <div className="profile_main">
            <div className="username">
                Loading...
            </div>
            <div className="user_photo">
                <ProfilePhoto imageSrc={"../icons/loading.gif"}/>
                {!loggedUser && (
                    <button className={subscribed ? "subs_btn_subscribed" : "subs_btn"} onClick={sub_function}>{subscribed ? "Subscribed" : "Subscribe!"}</button>
                )}
                </div>
            <UserInfos num_subs="x" num_vids="x" />
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

function renderAllProfile(user, video, loggedUser, subscribed, sub_function) {
    const numVids = video.length;
    return (
        <div className="profile_main">
            <div className="username">
                {user.nickname}
            </div>

            <div className="user_photo">
                <ProfilePhoto imageSrc={`data:image/png;base64,${user.userphoto}`}/>
                {!loggedUser && (
                    <button className={subscribed ? "subs_btn_subscribed" : "subs_btn"} onClick={sub_function}>{subscribed ? "Subscribed" : "Subscribe!"}</button>
                )}
                </div>
            <UserInfos num_subs={user.subscribers} num_vids={numVids} />
            <div className="user_videos">
                <div className="Profile_Videos">
                    <ProfileVideos videoData={video} />
                </div>
            </div>
        </div>
    );
}

function renderError(message) {
    return (
        <div className="profile_main">
            <div className="errorMsg">{message}</div>
        </div>
    );
}

export default Profile;

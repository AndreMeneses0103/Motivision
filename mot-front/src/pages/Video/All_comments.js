import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsers, verifyLog } from "../../services/userFetch";
import { getTokenId, refreshToken } from "../../scripts/getUser";
import { getComments } from "../../services/commentFetch";

function AllComments() {

    const loadChannel = (id) => {
        navigate(`/profile?user=${id}`);
    };

    function Comment({ id, src, channel, date, text }) {
        return (
        <div className="comment" id={id}>
            <div className="c_profile">
            <button className="c_prof_btn" onClick={() => loadChannel(id)}>
                <img
                id="userphoto"
                itemID="userphoto"
                src={`data:image/png;base64,${src}`}
                alt="Foto do Usuario"
                />
            </button>
            <span id="channel_name_prof">{channel}</span>
            <span id="data_comment">{date}</span>
            </div>
            <div id="comment_text">{text}</div>
        </div>
        );
    }

    function NoComments() {
        return (
        <div className="comment">
            <div className="no_comment">No comments yet. Be the first to share your thoughts!</div>
        </div>
        );
    }

    const [commentData, setCommentData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loadingComment, setLoadingComment] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const local = useLocation();
    const params = new URLSearchParams(local.search);
    const url = params.get("videoId");

    async function getCommentData(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getComments(url);
            if(data === null){
                setError("nonexistent")
            }else{
                setError("");
                setCommentData(data);
            }
        }
    }

    async function getAllUserData(data){
        let allUsers = "";
        for(let i = 0; i < data.allComments.length; i++){
            allUsers += data.allComments[i].userid;
            if(i < data.allComments.length - 1){
                allUsers += ",";
            }
        }
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            console.log("ALL USERS:", allUsers);
            const data = await getUsers(allUsers);
            if(data === null){
                setError("nonexistent");
            }else{
                setError("");
                setUserData(data);
            }
        }
    }

    async function tryGetCommentData(){
        try{
            await getCommentData();
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setLoadingComment(false);
        }
    }

    async function tryGetAllUsersData(){
        try{
            await getAllUserData(commentData);
        }catch(error){
            console.error(error);
            setError(error);
        }finally{
            setLoadingUsers(false);
        }
    }

    useEffect(()=>{
        (async()=>{
            await tryGetCommentData();
        })();
    },[]);

    useEffect(()=>{
        (async()=>{
            if(commentData !== null){
                await tryGetAllUsersData();
            }
        })()
    }, [commentData]);

    if(loadingComment || loadingUsers){
        return (
            <div>
                Loading...
            </div>
        )
    }else{
        if(commentData.allComments === null){
            return(
                <NoComments/>
            )
        }else{
            let allData = {...commentData, ...userData};
            return (
                <div>
                    {allData.allComments.map(comment =>{
                        const user = allData.user.find(u => u.usersettings._userid === comment.userid);
                        return (
                            <Comment
                                key={comment.id}
                                id={comment.userid}
                                src={user.userphoto}
                                channel={user.nickname}
                                date={comment.date}
                                text={comment.text}
                            />
                        );
                    })}
                </div>
            )
        }
    }
}

export default AllComments;

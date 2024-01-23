import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, verifyLog } from "../../services/userFetch";
import { getTokenId, refreshToken } from "../../scripts/getUser";
import { getComments } from "../../services/commentFetch";

function Comment({ id, src, channel, date, text }) {
    return (
    <div className="comment" id={id}>
        <div className="c_profile">
        <button className="c_prof_btn">
            <img
            id="userphoto"
            itemID="userphoto"
            src={src}
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

function AllComments() {

    const [commentData, setCommentData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const local = useLocation();
    const params = new URLSearchParams(local.search);
    const url = params.get("videoId");

    async function getCommentData(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getComments(url);
            if(data.video === null){
                setError("nonexistent")
            }else{
                setError("");
                setCommentData(data);
            }
        }
    }

    //FAZER REQUISICAO NO ENDPOINT DE USERS COM IDS
    async function getAllUserData(){
        const logUser = await verifyLog(getTokenId(refreshToken()));
        if(logUser){
            const data = await getUser(commentData);
            if(data.user === null){
                setError("nonexistent");
            }else{
                setError("");
                setUserData(data.user)
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
            setLoading(false);
        }
    }

    useEffect(()=>{
        (async()=>{
            await tryGetCommentData();
        })();
    },[]);

    //ADICIONAR COMENTARIOS DA REQUISICAO NO MAP
    if(commentData !== null){
        console.log(commentData.allComments);
    }

    if(commentData === null){
        return (
            <div>
                Loading...
            </div>
        )
    }else{
        return (
            <div>
                {(commentData.allComments).map(com => (

                    <Comment key={com.userid} id={com.userid} src={"test"} channel={"hello"} date={com.date} text={com.text}/>
                ))}
            </div>
        )
    }
}

export default AllComments;

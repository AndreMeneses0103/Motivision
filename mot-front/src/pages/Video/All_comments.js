import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyLog } from "../../services/userFetch";
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
    console.log(commentData);


    const data = [
    { id: 1, src: "./images/spiderman.jpg", channel: "User1", date:"01/02/03", text: "Lorem ipsum odio suspendisse posuere curae interdum nisl imperdiet hendrerit fusce, ut accumsan erat fermentum risus accumsan hac orci donec dolor, libero lorem nunc conubia cubilia condimentum rhoncus nullam praesent. inceptos proin ultricies himenaeos a risus malesuada vel elementum quisque in, ligula iaculis primis vulputate auctor ut in vitae fames taciti, etiam nisl pulvinar aliquam id pellentesque consequat risus rhoncus. lobortis erat convallis bibendum iaculis viverra tristique luctus ullamcorper fringilla neque elit eget turpis blandit primis, sodales sociosqu placerat tristique pharetra inceptos senectus consectetur dictumst cras consectetur sollicitudin nam eget." },
    { id: 2, src: "./images/machinarium.png", channel: "User2", date:"20/12/15", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus velit eu lorem imperdiet vulputate. Maecenas mattis eros augue, blandit maximus diam aliquam a. Curabitur aliquet quis nibh vel consectetur. Sed imperdiet pulvinar felis, sed sollicitudin felis auctor sed. In sodales, metus ut fringilla auctor, nisl odio vulputate lorem, in dignissim felis leo id ante. Suspendisse dapibus dignissim arcu. Nunc ultricies mi quis purus molestie pretium. Duis eu ligula aliquet, tincidunt massa tristique, vestibulum justo. Proin finibus, sapien at sollicitudin malesuada, nisi felis aliquam augue" },
    { id: 3, src: "./images/harrypop.png", channel: "User3", date:"10/04/20", text: "Etiam sodales nunc lorem, nec sagittis tellus varius sit amet. Sed euismod urna vitae bibendum luctus. Sed dignissim commodo consequat. Donec luctus risus at magna" },
    { id: 4, src: "./images/image1.jpg", channel: "User4", date:"21/07/23", text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet efficitur risus. Ut a lacinia sapien, in blandit libero. Pellentesque habitant morbi" },
    ];

    return (
    <div>
        {data.map(com => (
            <Comment key={com.id} id={com.id} src={com.src} channel={com.channel} date={com.date} text={com.text}/>
        ))}
    </div>
);
}

export default AllComments;

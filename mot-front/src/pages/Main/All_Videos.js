import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {accessToken, refreshToken} from "../../scripts/getUser";

function One({id, imageSrc, alt, video}) {
    const navigate = useNavigate();

    function loadVideo(link){
        //trocar para o endpoint do video
        navigate(`/video?videoId=${link}`);
    };

    return(
        <div className="mvid" id={id}>
            <button className="vidButton" onClick={() => loadVideo(video)}>
                <img
                    src={`data:image/png;base64,${imageSrc}`}
                    className="vidImage"
                    alt={alt}
                ></img>
            </button>
        </div>
    );
}

function Videos(){
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `${accessToken()}, ${refreshToken()}`,
                }
                const resp = await axios.get("http://192.168.15.146:8080/video/all", {headers:headers});
                let all_videos = resp.data;
                let data = [];
                
                for(let x = 0; x < all_videos.length; x++){
                    data.push({ id: all_videos[x].id , imageSrc: all_videos[x].thumb, alt: all_videos[x].title, video: all_videos[x].source })
                }
                
                setData(data);
            } catch (err) {
                console.error(err);
                setError(err);
            }
        };

        fetchData();
    }, []);

    if (error) {
        if(error.code === "ERR_BAD_REQUEST")
        return (
            <h1>
                Erro de autenticacao, realize o login novamente.
            </h1>
        );
    } else {
        return (
            <>
                {data.map(com => (
                    <One key={com.id} id={com.id} imageSrc={com.imageSrc} alt={com.alt} video={com.video}/>
                ))}
            </>
        );
    }
}

export default Videos;

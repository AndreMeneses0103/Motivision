import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {accessToken, refreshToken, refreshCookieValue} from "../../scripts/getUser";
import { getAllVideos } from "../../services/videoFetch";

function One({id, imageSrc, alt, video}) {
    const navigate = useNavigate();

    function loadVideo(link){
        navigate(`/video?videoId=${link}`);
    };

    return(
        <div className="mvid" id={id}>
            <button className="vidMainButton" onClick={() => loadVideo(video)}>
                <img
                    src={`data:image/png;base64,${imageSrc}`}
                    className="vidMainImage"
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
                    "Authorization": `${accessToken()}`,
                    "Refresh-Token": `${refreshToken()}`,
                }
                const resp = await getAllVideos();
                let all_videos = resp;
                let data = [];
                for(let x = 0; x < all_videos.videos.length; x++){
                    data.push({ id: all_videos.videos[x].id , imageSrc: all_videos.videos[x].thumb, alt: all_videos.videos[x].title, video: all_videos.videos[x].source})
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
                    <One key={com.id} id={com.id} imageSrc={com.imageSrc} alt={com.alt} video={com.id}/>
                ))}
            </>
        );
    }
}

export default Videos;

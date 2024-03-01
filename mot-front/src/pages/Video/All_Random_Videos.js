import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { accessToken, refreshCookieValue, refreshToken } from "../../scripts/getUser";
import { getAllVideos } from "../../services/videoFetch";
// import { useState } from "react";

function Video({id, video, alt, imageSrc}) {
    const navigate = useNavigate();

    function loadVideo(link){
        //trocar para o endpoint do video
        navigate(`/video?videoId=${link}`);
    };

    return(
    <div className="rvid" id={id}>
        <button
            className="vidButton"
            onClick={() => loadVideo(video)}
        >
            <img
                src={`data:image/png;base64,${imageSrc}`}
                className="vidImage"
                alt={alt}
            ></img>
        </button>
    </div>
    );
}

function AllVideos(){
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

    if(error){
        if(error.code === "ERR_BAD_REQUEST"){
            return(
                <h1>
                    Erro de autenticação, realize o login novamente.
                </h1>
            )
        }
    } else{
        //id, video, alt, imageSrc
        return(
            <>
                {data.map(com => (
                    <Video key={com.id} id={com.id} video={com.id} alt={com.alt} imageSrc={com.imageSrc} />
                ))}
            </>
        );
    }

    
}

export default AllVideos;
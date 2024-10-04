import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {accessToken, refreshToken, refreshCookieValue} from "../../scripts/getUser";
import { getAllVideos } from "../../services/videoFetch";

function One({id, imageSrc, alt, video, navigate}) {
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

function Videos({filter, search, channel}){
    const [data, setData] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            let resp = null;
            if(filter === "all"){
                resp = await getAllVideos();
            }else{
                //trocar para requisicao de videos inscritos
                resp = await getAllVideos();
            }
            let allData = resp.videos.map(video=>({
                id:video.id,
                imageSrc: video.thumb,
                alt: video.title
            }))
            setData(allData);
            setAllVideos(allData);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    useEffect(()=>{
        if(!search || search.trim() === ""){
            setData(allVideos);
            return;
        }
        if(data && data.length != 0){
            setData(
                allVideos.filter(video=>
                    video.alt.toLowerCase().includes(search.toLowerCase())
                )
            );
            return;
        }else{
            //fazer requisicao de pesquisa por titulo
        }
    },[search, allVideos])

    useEffect(() => {
        if (error && error.code === "ERR_BAD_REQUEST") {
            navigate("/login");
        }
    }, [error, navigate]);

    if (error) {
        return null;
    }
    
    return (
        <>
            {data.map(com => (
                <One key={com.id} id={com.id} imageSrc={com.imageSrc} alt={com.alt} video={com.id} navigate={navigate}/>
            ))}
        </>
    );
}

export default Videos;

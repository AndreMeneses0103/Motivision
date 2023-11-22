import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
                    src={imageSrc}
                    className="vidImage"
                    alt={alt}
                ></img>
            </button>
        </div>
    );
}

function Videos(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get("http://192.168.5.35:3000/video/all");
                let all_videos = resp.data;
                let data = [];
                
                for(let x = 1; x <= all_videos.length; x++){
                    data.push({ id: `video${x}`, imageSrc: `./images/image${x}.jpg`, alt: `Imagem do video ${x}`, video: `video${x}` })
                }
                
                setData(data);
            } catch (err) {
                console.error(err);
                setError(true);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <h1>
                ERRO!!!!
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

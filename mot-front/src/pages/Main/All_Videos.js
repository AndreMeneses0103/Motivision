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
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const headers = {
                //     "Content-Type": "application/json",
                //     "Authorization": `${accessToken()}`,
                //     "Refresh-Token": `${refreshToken()}`,
                // }

                console.log(filter);
                let resp = null;
                if(filter === "all"){
                    resp = await getAllVideos();
                }else{
                    console.log("hey")
                }
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

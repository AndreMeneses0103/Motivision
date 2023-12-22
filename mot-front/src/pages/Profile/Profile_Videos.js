import { useNavigate } from "react-router-dom";

function Videos({id, src, video}){

    const navigate = useNavigate();

    function loadVideo (link){
        navigate(`/video?videoId=${link}`);
    }

    return(
        <div className="mvid" id={id}>
            <button className="vidButton" onClick={()=>loadVideo(video)}>
                <img
                    src={`data:image/png;base64,${src}`}
                    className="vidImage"
                    alt="Imagem do video"
                ></img>
            </button>
        </div>
    )
}

export function UserInfos({num_subs, num_vids}){
    return(
        <div className="user_infos">
            <span id="user_subs">{num_subs} Subscribers</span>
            <span id="user_numvid">{num_vids} Videos</span>
        </div>
    )
}

export function ProfilePhoto({imageSrc}){
    return(
        <div className="user_photo">
                <button type="button" className="photo_btn">
                    <img
                    id="profile_photo"
                    itemID="profile_photo"
                    src={imageSrc}
                    alt="Foto do Usuario"
                    />
                </button>
            </div>
    )
}

export function ProfileVideos(videoData){
    const videos = videoData.videoData.videos;
    console.log(videos.map(item => (item.thumb)))

    return(
        <>
            {videos.map(item => (
                <Videos id={item.id} src={item.thumb} video={item.id}/>
            ))}
        </>
    );
}
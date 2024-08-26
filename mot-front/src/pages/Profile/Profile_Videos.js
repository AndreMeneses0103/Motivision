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
                    className="profImage"
                    alt="Imagem do video"
                ></img>
            </button>
        </div>
    )
}

export function UserInfos({num_subs, num_vids}){
    if(num_subs === "x" || num_vids === "x"){
        return(
            <div className="user_infos">
                <span id="user_subs">Loading...</span>
                <span id="user_numvid">Loading...</span>
            </div>
        )
    }else{
        return(
            <div className="user_infos">
                <span id="user_subs">{num_subs} {num_subs > 2 ? "Subscribers" : "Subscriber"}</span>
                <span id="user_numvid">{num_vids} {num_vids > 2 ? "Videos" : "Video"}</span>
            </div>
        )
    }

}

export function ProfilePhoto({imageSrc, isOwnUser}){
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
                {!isOwnUser && (
                    <button className="subs_btn">Subscribe!</button>
                )}
            </div>
    )
}

export function ProfileVideos({videoData}){
    return(
        <>
            {videoData.map(item => (
                <Videos key={item.id} id={item.id} src={item.thumb} video={item.id}/>
            ))}
        </>
    );
}
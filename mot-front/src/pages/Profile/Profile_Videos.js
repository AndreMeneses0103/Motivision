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
                    src={src}
                    className="vidImage"
                    alt="Imagem do video"
                ></img>
            </button>
        </div>
    );
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
                    src={`data:image/png;base64,${imageSrc}`}
                    alt="Foto do Usuario"
                    />
                </button>
            </div>
    )
}

export function ProfileVideos({userData}){
    const data = [
        {id: "", src:"./images/image1.jpg", video: 'video1'},
        {id: "", src:"./images/image2.jpg", video: 'video2'},
        {id: "", src:"./images/image3.jpg", video: 'video1'},
        {id: "", src:"./images/image4.jpg", video: 'video2'},
        {id: "", src:"./images/image2.jpg", video: 'video1'},
        {id: "", src:"./images/image3.jpg", video: 'video2'},
    ];

    for(let x = 0; x < data.length; x++){
        data[x].id = "video" + x;
    }

    return(
        <>
            {data.map(item => (
                <Videos key={item.id} id={item.id} src={item.src} video={item.video}/>
            ))};
        </>
    );
}
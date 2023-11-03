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

function ProfileVideos(){
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

export default ProfileVideos;
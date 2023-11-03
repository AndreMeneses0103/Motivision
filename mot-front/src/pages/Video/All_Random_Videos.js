import { useNavigate } from "react-router-dom";
// import { useState } from "react";

function Video({id, video, src}) {
    const navigate = useNavigate();

    function loadVideo(link){
        //trocar para o endpoint do video
        navigate(`/video?videoId=${link}`);
    };

    // const [loadVideo, setLoadVideo] = useState();

    // setLoadVideo(<source src="./videos/video1.mp4" type="video/mp4"></source>);

    // function trocaVideo(video) {
    //     console.log("Video selecionado -> " + video);
    //     const link = "./videos/" + video + ".mp4";
    //     setLoadVideo(link);
    // }
    return(
    <div className="rvid" id={id}>
        <button
            className="vidButton"
            onClick={() => loadVideo(video)}
        >
            <img
                src={src}
                className="vidImage"
                alt="Imagem do video"
            ></img>
        </button>
    </div>
    );
}

function AllVideos(){
    const data = [
        { id: '', src: './images/image1.jpg', video: 'video1' },
        { id: '', src: './images/image2.jpg', video: 'video2' },
        { id: '', src: './images/image3.jpg', video: 'video1' },
        { id: '', src: './images/image4.jpg', video: 'video2' },
        { id: '', src: './images/image1.jpg', video: 'video1' },
        { id: '', src: './images/image1.jpg', video: 'video2' },
        { id: '', src: './images/image1.jpg', video: 'video1' }
    ]

    for(let x = 0; x < data.length; x++){
        data[x].id = "video" + x;
    }

    return(
        <>
            {data.map(com => (
                <Video key={com.id} id={com.id} src={com.src} video={com.video}/>
            ))}
        </>
    );
}

export default AllVideos;
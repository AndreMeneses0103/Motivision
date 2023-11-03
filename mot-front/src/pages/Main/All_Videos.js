import { useNavigate } from "react-router-dom";

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
    const data = [
        { id: 'video1', imageSrc: './images/image1.jpg', alt: 'Imagem do video 1', video: 'video1' },
        { id: 'video2', imageSrc: './images/image2.jpg', alt: 'Imagem do video 2', video: 'video2' },
        { id: 'video3', imageSrc: './images/image3.jpg', alt: 'Imagem do video 3', video: 'video1' },
        { id: 'video4', imageSrc: './images/image4.jpg', alt: 'Imagem do video 4', video: 'video2' },
        { id: 'video5', imageSrc: './images/image1.jpg', alt: 'Imagem do video 5', video: 'video1' },
        { id: 'video6', imageSrc: './images/image1.jpg', alt: 'Imagem do video 6', video: 'video2' },
        { id: 'video7', imageSrc: './images/image1.jpg', alt: 'Imagem do video 7', video: 'video1' }
    ]

    return(
        <>
            {data.map(com => (
                <One key={com.id} id={com.id} imageSrc={com.imageSrc} alt={com.alt} video={com.video}/>
            ))}
        </>
    );
}

export default Videos;
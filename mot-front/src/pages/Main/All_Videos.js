import { useNavigate } from "react-router-dom";

function One({id, imageSrc, alt}) {
    const navigate = useNavigate();

    const loadVideo = (e) => {
        //trocar para o endpoint do video
        navigate("/video");
    };

    return(
        <div className="mvid" id={id}>
            <button className="vidButton" onClick={loadVideo}>
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
        { id: 'video1', imageSrc: './images/image1.jpg', alt: 'Imagem do video 1' },
        { id: 'video2', imageSrc: './images/image2.jpg', alt: 'Imagem do video 2' },
        { id: 'video3', imageSrc: './images/image3.jpg', alt: 'Imagem do video 3' },
        { id: 'video4', imageSrc: './images/image4.jpg', alt: 'Imagem do video 4' },
        { id: 'video5', imageSrc: './images/image1.jpg', alt: 'Imagem do video 5' },
        { id: 'video6', imageSrc: './images/image1.jpg', alt: 'Imagem do video 6' },
        { id: 'video7', imageSrc: './images/image1.jpg', alt: 'Imagem do video 7' }
    ]
    console.log(data);
    console.log({...data})
    return(
        <>
            {data.map(com => (
                <One key={com.id} id={com.id} imageSrc={com.imageSrc} alt={com.alt}/>
            ))}
        </>
    );
}

export default Videos;
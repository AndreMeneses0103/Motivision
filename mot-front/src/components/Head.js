import "./Head.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {accessToken, refreshToken} from "../../scripts/getUser";

function Head({id, imageSrc}) {
	const navigate = useNavigate();

	const loadUpload = (e) => {
		navigate('/upload');
	}

	const loadProfile = (e) => {
		navigate('/profile')
	}

	const loadMain = (e) => {
		navigate('/main')
	}
	return (
		<div className="header">
			<div className="user" id={id}>
				<button className="btn_profile" onClick={loadProfile}>
					<img
						id="userphoto"
						itemID="userphoto"
						src={`data:image/png;base64,${imageSrc}`}
						alt="Foto do Usuario"
					/>
				</button>
			</div>
			<div className="logo">
				<button className="btn_logo" onClick={loadMain}>Motivision</button>
			</div>
			<div className="upload_div">
				<button id="upload_btn" onClick={loadUpload}>
					<img id="upload_img" src="../icons/upload.png" alt="Upload Button"></img>
				</button>
			</div>
		</div>
	);
}

function atualizarValorCookie(nomeCookie, novoValor) {
    var todosCookies = document.cookie;
    var cookiesArray = todosCookies.split(';');

    for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();

        if (cookie.startsWith(nomeCookie + "=")) {

            document.cookie = nomeCookie + "=" + novoValor;

            return;
        }
    }

    document.cookie = nomeCookie + "=" + novoValor;
}

function User(){
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `${accessToken()}`,
                    "Refresh-Token": `${refreshToken()}`,
                }
                const resp = await axios.get(`http://192.168.15.146:8080/user/getIdInfo`, {headers:headers});
				//Continuar daqui (organizar dados recebidos da requisicao)
                let all_videos = resp.data;
                let data = [];
                if(all_videos.isValid && 'newAccessToken' in all_videos.isValid){
                    atualizarValorCookie("accessToken", all_videos.isValid.newAccessToken);
                    await fetchData();
                }else{
                    for(let x = 0; x < all_videos.videos.length; x++){
                        data.push({ id: all_videos.videos[x].id , imageSrc: all_videos.videos[x].thumb, alt: all_videos.videos[x].title, video: all_videos.videos[x].source})
                    }
                    setData(data);
                }

                
            } catch (err) {
                console.error(err);
                setError(err);
            }
        };

        fetchData();
    }, []);

    if (error) {
        if(error.code === "ERR_BAD_REQUEST")
        return (
            <h1>
                Erro de autenticacao, realize o login novamente.
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

export default Head;


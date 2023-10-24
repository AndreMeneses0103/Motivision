import { useState } from "react";
import "../Video/Video.css";
import Head from "../../components/Head";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";

function Video() {
    const [loadVideo, setLoadVideo] = useState();

    // setLoadVideo(<source src="./videos/video1.mp4" type="video/mp4"></source>);

    function trocaVideo(video) {
        console.log("Video selecionado -> " + video);
        const link = "./videos/" + video + ".mp4";
        setLoadVideo(link);
    }

    return (
        <div className="mainpage">
            <Head />
            <div className="video_itens">
                <div className="video_channel">
                    <div className="channel_user">
                        <button className="channel_btn">
                            <img
                                id="userphoto"
                                itemID="userphoto"
                                src="./images/spiderman.jpg"
                                alt="Foto do Usuario"
                            />
                        </button>
						<span id="channel_name">Canal Teste</span>
                    </div>
					<div className="video_subs">
						<button className="subs_btn">
							Subscribe!
						</button>
					</div>
                </div>
                <div className="screen_video">
                    <video id="playing_video" controls src={loadVideo}></video>
                </div>
				<div className="video_stats">
	{/*<span><img src="./icons/olho.png"/></span>*/}
				</div>
            </div>

            <div className="recommend_video">
                <div className="rvid" id="video1">
                    <button
                        className="vidButton"
                        onClick={() => {
                            trocaVideo("video1");
                        }}
                    >
                        <img
                            src="./images/image1.jpg"
                            className="vidImage"
                            alt="Imagem do video"
                        ></img>
                    </button>
                </div>
                <div className="rvid" id="video2">
                    <button
                        className="vidButton"
                        onClick={() => {
                            trocaVideo("video2");
                        }}
                    >
                        <img
                            src="./images/image2.jpg"
                            className="vidImage"
                            alt="Imagem do video"
                        ></img>
                    </button>
                </div>
                <div className="rvid" id="video3">
                    <button className="vidButton">
                        <img
                            src="./images/image3.jpg"
                            className="vidImage"
                            alt="Imagem do video"
                        ></img>
                    </button>
                </div>
                <div className="rvid" id="video4">
                    <button className="vidButton">
                        <img
                            src="./images/image4.jpg"
                            className="vidImage"
                            alt="Imagem do video"
                        ></img>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Video;

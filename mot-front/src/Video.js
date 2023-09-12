import { useState } from "react";
import "./Video.css";
import Head from "./components/Head";
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
			<div className="screen_video">
				<video width={500} id="playing_video" controls src={loadVideo}></video>
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
				<div className="rvid" id="video5">
					<button className="vidButton">
						<img
							src="./images/image1.jpg"
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

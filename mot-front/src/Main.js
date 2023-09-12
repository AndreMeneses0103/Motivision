// import { useState } from "react";
import "./Main.css"
import Head from "./components/Head";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";

function Main() { 

	return (
		<div className="div_main">
			<Head />
			<div className="Align_Videos">
				<div className="All_Videos">
					<div className="mvid" id="video1">
						<button className="vidButton">
							<img
								src="./images/image1.jpg"
								className="vidImage"
								alt="Imagem do video"
							></img>
						</button>
					</div>
					<div className="mvid" id="video2">
						<button className="vidButton">
							<img
								src="./images/image2.jpg"
								className="vidImage"
								alt="Imagem do video"
							></img>
						</button>
					</div>
					<div className="mvid" id="video3">
						<button className="vidButton">
							<img
								src="./images/image3.jpg"
								className="vidImage"
								alt="Imagem do video"
							></img>
						</button>
					</div>
					<div className="mvid" id="video4">
						<button className="vidButton">
							<img
								src="./images/image4.jpg"
								className="vidImage"
								alt="Imagem do video"
							></img>
						</button>
					</div>
					<div className="mvid" id="video5">
						<button className="vidButton">
							<img
								src="./images/image1.jpg"
								className="vidImage"
								alt="Imagem do video"
							></img>
						</button>
					</div>
					<div className="mvid" id="video6">
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
		</div>
	);
}

export default Main;


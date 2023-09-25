import React from "react";
import "./Head.css";
import { useNavigate } from "react-router-dom";

function Head() {
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
			<div className="user">
				<button className="btn_profile" onClick={loadProfile}>
					<img
						id="userphoto"
						itemID="userphoto"
						src="./images/machinarium.png"
						alt="Foto do Usuario"
					/>
				</button>
			</div>
			<div className="logo">
				<button className="btn_logo" onClick={loadMain}>Motivision</button>
			</div>
			<div className="upload_div">
				<button id="upload_btn" onClick={loadUpload}>
					<img id="upload_img" src="./upload.png" alt="Upload Button"></img>
				</button>
			</div>
		</div>
	);
}

export default Head;


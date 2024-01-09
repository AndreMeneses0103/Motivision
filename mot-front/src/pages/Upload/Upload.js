// import { useState } from "react";
import "../../styles/Upload.css";
import Head from "../../components/Head";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";

function Upload() {

	return (
		<div className="uploadpage">
			<Head />
			<div className="up_text">Upload a Video</div>
			<div className="up_itens">
				<div className="up_inputs">
					<div className="up_title">Title</div>
					<input type="text" id="up_title_input"></input>
					<div className="up_desc">Description</div>
					<textarea id="up_desc_input"></textarea>
				</div>
				<div className="up_video">
					<button id="up_vid_button">+</button>
				</div>
			</div>
			<div className="up_upload">
				<button id="up_upload_button">Upload</button>
			</div>
		</div>
	);
}

export default Upload;

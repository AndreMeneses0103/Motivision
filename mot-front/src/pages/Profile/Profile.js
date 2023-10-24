import "./Profile.css"
import "../../components/Scroll.css"
import Head from "../../components/Head";

function Profile(){

    console.log("CHEGOU PROFILE!");
    return(
        <div className="profile_main">
            <Head/>
            <div className="username">
                Teste
            </div>
            <div className="user_photo">
                <button type="button" className="photo_btn">
                    <img
                    id="profile_photo"
                    itemID="profile_photo"
                    src="./images/machinarium.png"
                    alt="Foto do Usuario"
                    />
                </button>
            </div>
			<div className="user_infos">
				<span id="user_subs">55 Subscribers</span>
				<span id="user_numvid">7 Videos</span>
			</div>
            <div className="user_videos">
            <div className="Profile_Videos">
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
                    <div className="mvid" id="video7">
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


export default Profile;
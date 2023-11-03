import "./Profile.css"
import "../../components/Scroll.css"
import Head from "../../components/Head";
import ProfileVideos from "./Profile_Videos"

function Profile(){
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
				<ProfileVideos/>
			</div>
            
            </div>
        </div>
    );

}


export default Profile;
import "../Profile.css"
import Head from "../components/Head";

function Profile(){

    return(
        <div className="profile_main">
            <Head/>
            <div className="username">
                Fadresde
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
            <div className="user_videos">
            
            </div>
        </div>
    );

}

export default Profile;
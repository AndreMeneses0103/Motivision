import { useState } from "react";
import "../Video/Video.css";
import Head from "../../components/Head";
import AllComments from "./All_comments";
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
            <Head/>
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
                <div className="video_title">VIDEO TITLE</div>
                <div className="screen_video">
                    <video id="playing_video" controls src={loadVideo}></video>
                </div>
				<div className="video_stats">
                    <span className="video_icon_span"><img className="video_icons" id="view_icon" src="./icons/olho.png" alt="View"/> 0</span>
                    <span className="video_icon_span"><img className="video_icons" id="like_icon" src="./icons/afirmativo.png" alt="View"/> 0</span>
                    <span className="video_icon_span"><img className="video_icons" id="dislike_icon" src="./icons/afirmativo.png" alt="View"/> 0</span>
				</div>
                <div className="video_text">
                    <span className="desc_title">Description</span>
                    <span className="desc_text">Lorem ipsum elit nisi habitant dictumst turpis eleifend fusce, venenatis blandit diam consectetur ullamcorper pellentesque primis cubilia, nibh velit convallis praesent tortor turpis ut. dictumst metus primis cubilia curabitur condimentum pellentesque sed semper vitae, velit nulla morbi donec mi et arcu etiam, risus tincidunt fermentum rutrum id molestie elit etiam. mauris nulla condimentum duis donec adipiscing vestibulum non nec pulvinar nunc vulputate iaculis a ante, a interdum id porta fringilla turpis lorem feugiat faucibus et ullamcorper molestie. congue libero torquent iaculis consectetur nisl netus donec et, euismod mollis netus inceptos adipiscing per suscipit, mattis sapien donec ligula diam laoreet gravida. </span>
                    <span className="desc_title">Tags</span>
                    <div className="hashtags_field">
                        <span className="hashtag"><a href="https://www.spacejam.com/1996/">#yeah</a></span>
                        <span className="hashtag"><a>#nice</a></span>
                        <span className="hashtag"><a>#cool</a></span>
                    </div>
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
                <div className="rvid" id="video5">
                    <button className="vidButton">
                        <img
                            src="./images/image4.jpg"
                            className="vidImage"
                            alt="Imagem do video"
                        ></img>
                    </button>
                </div>
                <div className="rvid" id="video6">
                    <button className="vidButton">
                        <img
                            src="./images/image4.jpg"
                            className="vidImage"
                            alt="Imagem do video"
                        ></img>
                    </button>
                </div>
            </div>
            <div className="comments_field">
                <div className="comments_title">All Comments</div>
                <button className="add_comment_btn">Add a comment!</button>
                <div className="all_comments">
                    <AllComments/>
                    {/*<div className="comment" id="cm1">
                        <div className="c_profile">
                            <button className="c_prof_btn">
                                <img
                                    id="userphoto"
                                    itemID="userphoto"
                                    src="./images/spiderman.jpg"
                                    alt="Foto do Usuario"
                                />
                            </button>
                            <span id="channel_name_prof">Canal Teste</span>
                        </div>
                        <div id="comment_text">Teste video 1</div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
}

export default Video;

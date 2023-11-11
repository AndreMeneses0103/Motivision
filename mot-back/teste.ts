import User from './models/User';
import UserSetting from './models/UserSetting';
import Video from './models/Video';
import Comments from './models/Comment';
import VideoData from './models/VideoData';

const user = new User(new UserSetting("Jose", "teste@email.com", "senha123"), ["asd123", "4f2123"], ["kdj2j3", "djah23"], ["4412", "4542"], 70, "./testes/test")

const video = new Video("fh23j1", "fkajs23", "./video/thumb", "NEW VIDEO!", "Lorem ipsum natran morem", ["new", "animation", "original"], new VideoData(30, 2, 150))

const comment = new Comments("ifka23n4", "fj2h3h4b", "fk41p2l3", "2023-11-09", "Muito legal");

//Tests with Video
console.log(video.title);
console.log(video.video_data.likes);
console.log(video.tags);
video.tags[0] = "Surprise";
console.log(video.tags);

//Tests with User
console.log('-----');
console.log(user.usersettings.name);
console.log(user.subscribed);
console.log(user.subscribers);
user.usersettings.name = "Pedro";
console.log(user.usersettings.name);
console.log(user.usersettings.password);

//Tests with Comment
console.log('-----');
console.log(comment.date);
console.log(comment.id);
console.log(comment.text);
console.log(comment.userid);
console.log(comment.videoid);
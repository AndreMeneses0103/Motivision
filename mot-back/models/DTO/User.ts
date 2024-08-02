import UserSetting from "./UserSetting";

export default class User {
    private usersettings: UserSetting;
    private videos: string[];
    private watched_videos: string[];
    private liked_videos: string[];
    private disliked_videos: string[];
    private subscribed: string[];
    private subscribers: number;
    private userphoto?: string;
    private nickname: string;

    constructor(
        usersettings: UserSetting,
        videos: string[],
        watched_videos: string[],
        liked_videos: string[],
        disliked_videos: string[],
        subscribed: string[],
        subscribers: number,
        nickname: string,
        userphoto?: string
    ) {
        this.usersettings = usersettings;
        this.videos = videos;
        this.watched_videos = watched_videos;
        this.liked_videos = liked_videos;
        this.disliked_videos = disliked_videos;
        this.subscribed = subscribed;
        this.subscribers = subscribers;
        this.nickname = nickname;
        this.userphoto = userphoto;
    }

    get getUserSettings(): UserSetting {
        return this.usersettings;
    }

    get getVideos(): string[] {
        return this.videos;
    }

    get getWatched_videos(): string[] {
        return this.watched_videos;
    }

    get getLiked_Videos(): string[]{
        return this.liked_videos;
    }

    get getDisliked_Videos(): string[]{
        return this.disliked_videos;
    }

    get getSubscribed(): string[] {
        return this.subscribed;
    }

    get getSubscribers(): number {
        return this.subscribers;
    }

    get getUserphoto(): string {
        return this.userphoto !== undefined && this.userphoto !== null ? this.userphoto : "";
    }

    get getNickname():string{
        return this.nickname;
    }

    set getUserSettings(value: UserSetting) {
        this.usersettings = value;
    }

    set setVideos(value: string[]) {
        this.videos = value;
    }

    set setWatched_videos(value: string[]) {
        this.watched_videos = value;
    }

    set setLiked_videos(value: string[]) {
        this.liked_videos = value;
    }

    set setDisliked_videos(value: string[]) {
        this.disliked_videos = value;
    }

    set setSubscribed(value: string[]) {
        this.subscribed = value;
    }

    set setSubscribers(value: number) {
        this.subscribers = Math.max(value, 0);
    }

    set setUserphoto(value: string) {
        this.userphoto = value;
    }

    set setNickname(value: string){
        this.nickname = value;
    }
}
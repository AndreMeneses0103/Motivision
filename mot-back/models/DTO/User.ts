import UserSetting from "./UserSetting";

export default class User {
    private usersettings: UserSetting;
    private videos: string[];
    private watched_videos: string[];
    private subscribed: string[];
    private subscribers: number;
    private userphoto?: string;
    private nickname: string;

    constructor(
        usersettings: UserSetting,
        videos: string[],
        watched_videos: string[],
        subscribed: string[],
        subscribers: number,
        nickname: string,
        userphoto?: string
    ) {
        this.usersettings = usersettings;
        this.videos = videos;
        this.watched_videos = watched_videos;
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

    set getVideos(value: string[]) {
        this.videos = value;
    }

    set getWatched_videos(value: string[]) {
        this.watched_videos = value;
    }

    set getSubscribed(value: string[]) {
        this.subscribed = value;
    }

    set getSubscribers(value: number) {
        // Validando que subscribers não seja negativo
        this.subscribers = Math.max(value, 0);
    }

    set getUserphoto(value: string) {
        this.userphoto = value;
    }

    set getNickname(value: string){
        this.nickname = value;
    }
}
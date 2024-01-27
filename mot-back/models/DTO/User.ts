import UserSetting from "./UserSetting";

export default class User {
    private _usersettings: UserSetting;
    private _videos: string[];
    private _watched_videos: string[];
    private _subscribed: string[];
    private _subscribers: number;
    private _userphoto: string;
    private _nickname: string;

    constructor(
        usersettings: UserSetting,
        videos: string[],
        watched_videos: string[],
        subscribed: string[],
        subscribers: number,
        userphoto: string,
        nickname: string
    ) {
        this._usersettings = usersettings;
        this._videos = videos;
        this._watched_videos = watched_videos;
        this._subscribed = subscribed;
        this._subscribers = subscribers;
        this._userphoto = userphoto;
        this._nickname = nickname;
    }

    get usersettings(): UserSetting {
        return this._usersettings;
    }

    get videos(): string[] {
        return this._videos;
    }

    get watched_videos(): string[] {
        return this._watched_videos;
    }

    get subscribed(): string[] {
        return this._subscribed;
    }

    get subscribers(): number {
        return this._subscribers;
    }

    get userphoto(): string {
        return this._userphoto;
    }

    get nickname():string{
        return this._nickname;
    }

    set usersettings(value: UserSetting) {
        this._usersettings = value;
    }

    set videos(value: string[]) {
        this._videos = value;
    }

    set watched_videos(value: string[]) {
        this._watched_videos = value;
    }

    set subscribed(value: string[]) {
        this._subscribed = value;
    }

    set subscribers(value: number) {
        // Validando que subscribers não seja negativo
        this._subscribers = Math.max(value, 0);
    }

    set userphoto(value: string) {
        this._userphoto = value;
    }

    set nickname(value: string){
        this._nickname = value;
    }
}
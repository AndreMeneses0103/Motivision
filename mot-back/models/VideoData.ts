export default class VideoData {
    private _likes: number;
    private _dislikes: number;
    private _views: number;

    constructor(likes: number, dislikes: number, views: number) {
        this._likes = likes;
        this._dislikes = dislikes;
        this._views = views;
    }

    public get likes(): number {
        return this._likes;
    }
    public set likes(value: number) {
        this._likes = value;
    }

    public get dislikes(): number {
        return this._dislikes;
    }
    public set dislikes(value: number) {
        this._dislikes = value;
    }

    public get views(): number {
        return this._views;
    }
    public set views(value: number) {
        this._views = value;
    }
}
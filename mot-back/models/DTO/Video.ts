import VideoData from "./VideoData";

export default class Video {
    private _id: string;
    private _userid: string;
    private _thumb: string;
    private _title: string;
    private _description: string;
    private _tags: string[];
    private _video_data: VideoData;

    constructor(
        id: string,
        userid: string,
        thumb: string,
        title: string,
        description: string,
        tags: string[],
        video_data: VideoData
    ) {
        this._id = id;
        this._userid = userid;
        this._thumb = thumb;
        this._title = title;
        this._description = description;
        this._tags = tags;
        this._video_data = video_data;
    }

    get id(): string {
        return this._id;
    }

    get userid(): string {
        return this._userid;
    }

    get thumb(): string {
        return this._thumb;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get tags(): string[] {
        return this._tags;
    }

    get video_data(): VideoData {
        return this._video_data;
    }

    set id(id: string) {
        this._id = id;
    }

    set userid(userid: string) {
        this._userid = userid;
    }

    set thumb(thumb: string) {
        this._thumb = thumb;
    }

    set title(title: string) {
        this._title = title;
    }

    set description(description: string) {
        this._description = description;
    }

    set tags(tags: string[]) {
        this._tags = tags;
    }

    set video_data(video_data: VideoData) {
        this._video_data = video_data;
    }
}

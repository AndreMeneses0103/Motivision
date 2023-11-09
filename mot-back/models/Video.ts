class Video {
    private _id: string;
    private _userid: string;
    private _thumb: string;
    private _title: string;
    private _description: string;
    private _tags: string[];
    private _video_data: object[];

    constructor(
        id: string,
        userid: string,
        thumb: string,
        title: string,
        description: string,
        tags: string[],
        video_data: any[]
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

    get video_data(): any[] {
        return this._video_data;
    }

    set id(value: string) {
        this._id = value;
    }

    set userid(value: string) {
        this._userid = value;
    }

    set thumb(value: string) {
        this._thumb = value;
    }

    set title(value: string) {
        this._title = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set tags(value: string[]) {
        this._tags = value;
    }

    set video_data(value: any[]) {
        this._video_data = value;
    }
}

export default Video;

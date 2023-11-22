import VideoData from "./VideoData";

export default class Video {
    private id: string;
    private userid: string;
    private thumb: string;
    private title: string;
    private description: string;
    private tags: string[];
    private videodata: VideoData;

    constructor(
        id: string,
        userid: string,
        thumb: string,
        title: string,
        description: string,
        tags: string[],
        videodata: VideoData
    ) {
        this.id = id;
        this.userid = userid;
        this.thumb = thumb;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.videodata = videodata;
    }

    get getId(): string {
        return this.id;
    }

    get getUserid(): string {
        return this.userid;
    }

    get getThumb(): string {
        return this.thumb;
    }

    get getTitle(): string {
        return this.title;
    }

    get getDescription(): string {
        return this.description;
    }

    get getTags(): string[] {
        return this.tags;
    }

    get getVideodata(): VideoData {
        return this.videodata;
    }

    set setId(id: string) {
        this.id = id;
    }

    set setUserid(userid: string) {
        this.userid = userid;
    }

    set setThumb(thumb: string) {
        this.thumb = thumb;
    }

    set setTitle(title: string) {
        this.title = title;
    }

    set setDescription(description: string) {
        this.description = description;
    }

    set setTags(tags: string[]) {
        this.tags = tags;
    }

    set setVideodata(videodata: VideoData) {
        this.videodata = videodata;
    }
}

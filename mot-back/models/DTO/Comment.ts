export default class Comments {
    private id: string;

    private userid: string;

    private videoid?: string;

    private date: string;

    private text:string;

    constructor(
        id: string, 
        userid: string,
        date: string, 
        text: string,
        videoid?: string
    ) {
        this.id = id;
        this.userid = userid;
        this.date = date;
        this.text = text;
        this.videoid = videoid;
    }    

    public commentDatabase(): Record<string, string> {
        const obj: Record<string, string> = {
            id: this.id,
            userid: this.userid,
            date: this.date,
            text: this.text,
        };

        if (this.videoid !== undefined && this.videoid !== null) {
            obj.videoid = this.videoid;
        }

        return obj;
    }

    public get getId(): string {
        return this.id;
    }
    public set setId(value: string) {
        this.id = value;
    }

    public get getUserid(): string {
        return this.userid;
    }
    public set setUserid(value: string) {
        this.userid = value;
    }
    
    public get getVideoid(): string {
        return this.videoid !== undefined && this.videoid !== null ? this.videoid : "";
    }
    public set setVideoid(value: string) {
        this.videoid = value;
    }

    public get getDate(): string {
        return this.date;
    }
    public set setDate(value: string) {
        this.date = value;
    }

    public get getText():string{
        return this.text;
    }
    public set setText(value: string){
        this.text = value;
    }
}
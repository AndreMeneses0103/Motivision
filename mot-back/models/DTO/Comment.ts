export default class Comments {
    private _id: string;
    private _userid: string;

    private _videoid: string;

    private _date: string;

    private _text:string;

    constructor(
        id: string, 
        userid: string, 
        videoid: string, 
        date: string, 
        text: string
    ) {
        this._id = id;
        this._userid = userid;
        this._videoid = videoid;
        this._date = date;
        this._text = text;
    }    

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get userid(): string {
        return this._userid;
    }
    public set userid(value: string) {
        this._userid = value;
    }
    
    public get videoid(): string {
        return this._videoid;
    }
    public set videoid(value: string) {
        this._videoid = value;
    }

    public get date(): string {
        return this._date;
    }
    public set date(value: string) {
        this._date = value;
    }

    public get text():string{
        return this._text;
    }
    public set text(value: string){
        this._text = value;
    }
}
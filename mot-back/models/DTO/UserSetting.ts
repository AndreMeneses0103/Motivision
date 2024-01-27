export default class UserSetting {
    private _userid: string;
    private _name: string;
    private _email: string;
    private _password?: string;

    constructor(userid:string, name: string, email: string, password?: string) {
        this._userid = userid;
        this._name = name;
        this._email = email;
        this._password = password;
    }

    public get userid(): string {
        return this._userid;
    }

    public set userid(userid: string) {
        this._userid = userid;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password(): string {
        return this._password !== undefined && this._password !== null ? this._password : "";
    }

    public set password(password: string) {
        this._password = password;
    }
}

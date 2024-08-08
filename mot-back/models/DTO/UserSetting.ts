export default class UserSetting {
    private userid: string;
    private name: string;
    private email: string;
    private password?: string;

    constructor(userid:string, name: string, email: string, password?: string) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public get getUserId(): string {
        return this.userid;
    }

    public set setUserId(userid: string) {
        this.userid = userid;
    }

    public get getName(): string {
        return this.name;
    }

    public set setName(name: string) {
        this.name = name;
    }

    public get getEmail(): string {
        return this.email;
    }

    public set setEmail(email: string) {
        this.email = email;
    }

    public get getPassword(): string {
        return this.password !== undefined && this.password !== null ? this.password : "";
    }

    public set setPassword(password: string) {
        this.password = password;
    }
}

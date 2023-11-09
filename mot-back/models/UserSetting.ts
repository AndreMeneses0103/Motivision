class UserSetting {
    private _name: string;
    private _email: string;
    private _password: string;

    constructor(name: string, email: string, password: string) {
        this._name = name;
        this._email = email;
        this._password = password;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }
}

export default UserSetting;

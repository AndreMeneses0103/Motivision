import * as jwt from 'jsonwebtoken';

export default class authToken{

    public validate(token: string, key: string): Promise<{auth:boolean, message:string, value: any} | undefined> {
        return new Promise((resolve) => {
            jwt.verify(token, key, (err, decoded) => {
                if (err) {
                    resolve({
                        auth: false,
                        message: "Token expired or not valid",
                        value: err.message
                    });
                } else {
                    resolve({
                        auth: true,
                        message: "Successfully validated!",
                        value: decoded
                    });
                }
            });
        });
    }
}
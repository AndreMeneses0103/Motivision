import * as jwt from 'jsonwebtoken';

export default class authToken {

    public validate(accessToken: string, refreshToken: string, accessKey: string, refreshKey: string): Promise<{ auth: boolean, message: string, code: number, value: any } | undefined> {
        return new Promise((resolve) => {
            jwt.verify(accessToken, accessKey, (ac_err, ac_decoded) => {
                if (ac_err) {
                    jwt.verify(refreshToken, refreshKey, (re_err, re_decoded) => {
                        if (re_err || !re_decoded || typeof re_decoded === 'string') {
                            resolve({
                                auth: false,
                                message: "Both tokens expired or not valid",
                                code:0,
                                value: re_err ? re_err.message : "refreshToken not decoded"
                            });
                        } else {
                            if ('userId' in re_decoded) {
                                const newAccessToken = jwt.sign({ userId: re_decoded.userId }, accessKey, { expiresIn: '15min' });
                                resolve({
                                    auth: true,
                                    message: "New Access Token Generated",
                                    code:1,
                                    value: {
                                        newAccessToken: newAccessToken,
                                        originalRefreshTokenPayload: re_decoded
                                    }
                                });
                            } else {
                                resolve({
                                    auth: false,
                                    message: "Invalid refreshToken payload",
                                    code:0,
                                    value: re_decoded
                                });
                            }
                        }
                    });
                } else {
                    resolve({
                        auth: true,
                        message: "Successfully validated!",
                        code:0,
                        value: ac_decoded
                    });
                }
            });
        });
    }
}

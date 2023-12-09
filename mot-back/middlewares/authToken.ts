import * as jwt from 'jsonwebtoken';

export default class authToken {

    public validate(accessToken: string, refreshToken: string, accessKey: string, refreshKey: string): Promise<{ auth: boolean, message: string, value: any } | undefined> {
        return new Promise((resolve) => {
            jwt.verify(accessToken, accessKey, (ac_err, ac_decoded) => {
                if (ac_err) {
                    jwt.verify(refreshToken, refreshKey, (re_err, re_decoded) => {
                        if (re_err || !re_decoded || typeof re_decoded === 'string') {
                            resolve({
                                auth: false,
                                message: "Both tokens expired or not valid",
                                value: re_err ? re_err.message : "refreshToken not decoded"
                            });
                        } else {
                            // Gerar novo accessToken aqui
                            if ('userId' in re_decoded) {
                                const newAccessToken = jwt.sign({ userId: re_decoded.userId }, accessKey, { expiresIn: '15min' });

                                resolve({
                                    auth: true,
                                    message: "New Access Token Generated",
                                    value: {
                                        newAccessToken: newAccessToken,
                                        originalRefreshTokenPayload: re_decoded
                                    }
                                });
                            } else {
                                resolve({
                                    auth: false,
                                    message: "Invalid refreshToken payload",
                                    value: re_decoded
                                });
                            }
                        }
                    });
                } else {
                    resolve({
                        auth: true,
                        message: "Successfully validated!",
                        value: ac_decoded
                    });
                }
            });
        });
    }
}

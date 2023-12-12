import authToken from "./authToken";
import createKey from "./createKey";

export default class Permission {
    public async getPermission(allTokens: string, data: any) {
        const [accessToken, refreshToken] = allTokens
            .split(",")
            .map((token) => token.trim());
        const generator = new createKey();
        const accessKey = generator.generateAccessKey();
        const refreshKey = generator.generateRefreshKey();
        const autorizer = new authToken();
        const verify = await autorizer.validate(
            accessToken,
            refreshToken,
            accessKey,
            refreshKey
        );
        if (verify !== undefined) {
            if (verify.auth) {
                let responsePayload: any = {};

                if (verify.code === 1) {
                    responsePayload.auth = true;
                    responsePayload.message = verify.message;
                    responsePayload.newAccessToken =
                        verify.value.newAccessToken;
                } else {
                    responsePayload.auth = true;
                    responsePayload.message = verify.message;
                }

                return responsePayload;
            } else {
                return {
                    auth: false,
                    message: verify.message,
                };
            }
        }
    }
}

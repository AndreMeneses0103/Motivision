import { jwtDecode as jwt_decode } from "jwt-decode";

function getToken() {
    const [key, token] = document.cookie.split("=");
    if (key === "authToken") {
        try {
            return token;
        } catch (err) {
            return `Error: ${err}`;
        }
    } else {
        return null;
    }
}

export default function accessToken() {
    const userToken = getToken();
    if (userToken) {
        return userToken;
    } else {
        return null;
    }
}

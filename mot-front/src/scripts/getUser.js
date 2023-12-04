const all_cookies = console.log("COOKIE:", document.cookie.split(";"));

function getAccessToken() {
    const [key, token] = all_cookies[0].split("=");
    if (key === "accessToken") {
        try {
            console.log("Access Token:", token);
            return token;
        } catch (err) {
            return `Error: ${err}`;
        }
    } else {
        return null;
    }
}

function getRefreshToken() {
    const [key, token] = all_cookies[1].split("=");
    if (key === "refreshToken") {
        try {
            console.log("Refresh Token:", token);
            return token;
        } catch (err) {
            return `Error: ${err}`;
        }
    } else {
        return null;
    }
}

export function accessToken() {
    const accessToken = getAccessToken();
    if (accessToken) {
        return accessToken;
    } else {
        return null;
    }
}

export function refreshToken() {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
        return refreshToken;
    } else {
        return null;
    }
}

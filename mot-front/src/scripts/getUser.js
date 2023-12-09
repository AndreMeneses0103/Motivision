function getAccessToken(cookie) {
    const [key, token] = cookie[0].split("=");
    if (key === "accessToken") {
        try {
            return token;
        } catch (err) {
            return `Error: ${err}`;
        }
    } else {
        return null;
    }
}

function getRefreshToken(cookie) {
    const [key, token] = cookie[1].split("=");
    if (key.trim() === "refreshToken") {
        try {
            return token;
        } catch (err) {
            return `Error: ${err}`;
        }
    } else {
        return null;
    }
}

export function accessToken() {
    const all_cookies = document.cookie.split(";");
    const accessToken = getAccessToken(all_cookies);
    if (accessToken) {
        return accessToken;
    } else {
        return null;
    }
}

export function refreshToken() {
    const all_cookies = document.cookie.split(";");
    const refreshToken = getRefreshToken(all_cookies);
    if (refreshToken) {
        return refreshToken;
    } else {
        return null;
    }
}

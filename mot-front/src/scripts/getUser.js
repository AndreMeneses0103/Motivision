import {jwtDecode} from 'jwt-decode';

function getCookieValue(cookie, name) {
    const cookiePairs = cookie.split(';');
    for (const pair of cookiePairs) {
        const [key, value] = pair.split('=');
        if (key.trim() === name) {
            try {
                return value;
            } catch (err) {
                return `Error: ${err}`;
            }
        }
    }
    return null;
}

export function accessToken() {
    const all_cookies = document.cookie.split(";");
    const accessToken = getCookieValue(all_cookies.join(';'), "accessToken");
    return accessToken || null;
}

export function refreshToken() {
    const all_cookies = document.cookie.split(";");
    const refreshToken = getCookieValue(all_cookies.join(';'), "refreshToken");
    return refreshToken || null;
}

export function refreshCookieValue(cookieName, newValue) {
    var todosCookies = document.cookie;
    var cookiesArray = todosCookies.split(';');

    for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();

        if (cookie.startsWith(cookieName + "=")) {

            document.cookie = cookieName + "=" + newValue;

            return;
        }
    }

    document.cookie = cookieName + "=" + newValue;
}

export function getTokenId(token){
    var decoded = jwtDecode(token);
    return decoded.userId;
}
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

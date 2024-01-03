import { refreshCookieValue } from "../scripts/getUser";
import { api, log_api } from "./api";

async function getUser(userId) {
    const req = await api.get(`/user/getIdInfo?user=${userId}`);
    return req.data;
}

async function verifyLog(userId){
    let req = await api.get(`/user/getIdInfo?user=${userId}`);
    if(req.data.isValid && "newAccessToken" in req.data.isValid){
        refreshCookieValue("accessToken", req.data.isValid.newAccessToken);
        req = await api.get(`/user/getIdInfo?user=${userId}`);
    }
    return true;
}

function setLogin(name,password){
    const req = log_api.post(`/user/postUserCredentials`, {
        "name": name,
        "password": password
    })
    return req;
}

export {
    getUser,
    setLogin,
    verifyLog
}
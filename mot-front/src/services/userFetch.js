import { refreshCookieValue } from "../scripts/getUser";
import { api, form_api, log_api } from "./api";

async function getUser(userId) {
    const req = await api.get(`/user/getIdInfo?user=${userId}`);
    return req.data;
}

async function getUsers(usersIds){
    const req = await api.get(`/user/getIdsInfos?users=${usersIds}`);
    return req.data;
}

async function verifyLog(userId){
    let req = await api.get(`/user/getIdInfo?user=${userId}`);
    if(req.data.isValid && "newAccessToken" in req.data.isValid){
        refreshCookieValue("accessToken", req.data.isValid.newAccessToken);
        req = await api.get(`/user/getIdInfo?user=${userId}`);
    }

    return !!req;
}

async function verifyName(name){
    const req = await api.get(`/user/getRegisteredName?name=${name}`);
    return req.data;
}

async function verifyEmail(email){
    const req = await api.get(`/user/getRegisteredEmail?email=${email}`);
    return req.data;
}

async function registerNewUser(name, email, password, channel, photo){
    const formdata = new FormData();
    let photofile = new File([photo], "teste.png");
    formdata.append('file', photo);
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('channel', channel);

    const req = await form_api.post(`user/postRegisterUser`,formdata,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return req;
}

async function setLogin(name,password){
    const req = await log_api.post(`/user/postUserCredentials`, {
        "name": name,
        "password": password
    })
    return req;
}

async function postVideoView(videoid, user){
    let newUser = { ...user };
    delete newUser.userphoto;
    const req = await api.post(`/user/postNewView`, {
        "videoid": videoid,
        "user": newUser
    });
    return req;
}

async function postLike(videoid, user){
    let newUser = { ...user };
    delete newUser.userphoto;
    const req = await api.post(`/user/postLike`, {
        "videoid": videoid,
        "user": newUser
    });
    return req;
}

async function postDislike(videoid, user){
    let newUser = { ...user };
    delete newUser.userphoto;
    const req = await api.post(`/user/postDislike`, {
        "videoid": videoid,
        "user": newUser
    });
    return req;
}

export {
    getUser,
    getUsers,
    setLogin,
    verifyLog,
    verifyEmail,
    verifyName,
    registerNewUser,
    postVideoView,
    postLike,
    postDislike
}
import { api, blob_api } from "./api";

async function getAllUserVideos(userVideos){
    const req = await api.get(`/video/search?videos=${userVideos.join(',')}`);
    return req.data;
}

async function getAllVideos(){
    const req = await api.get(`/video/all`);
    return req.data;
}

async function getVideoInfo(id){
    const req = await api.get(`/video/search?videos=${id}`);
    return req.data;
}

async function getVideoSource(id){
    const req = await blob_api.get(`/video/source?video=${id}`);
    return req.data;
}

export {
    getAllUserVideos,
    getVideoInfo,
    getVideoSource,
    getAllVideos
}
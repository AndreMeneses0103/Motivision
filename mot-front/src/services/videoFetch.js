import { api, log_api } from "./api";

async function getAllUserVideos(userVideos){
    const req = await api.get(`video/search?videos=${userVideos.join(',')}`);
    return req.data;
}
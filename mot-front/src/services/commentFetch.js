import { api } from "./api";

async function getComments(id) {
    const req = await api.get(`/comment/allComments?comment=${id}`);
    return req.data;
}

export{
    getComments
}

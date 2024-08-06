import { api } from "./api";

async function getComments(id) {
    const req = await api.get(`/comment/allComments?comment=${id}`);
    return req.data;
}

async function setComment(videoid, text){
    const req = await api.post(`comment/newComment`,{
        "videoid":videoid,
        "date": new Date(),
        "text":text
    })
    return req.data;
}

export{
    getComments,
    setComment
}

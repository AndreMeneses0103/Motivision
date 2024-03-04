import { Request, Response } from "express";
import CommentDAO from "../models/DAO/CommentDAO";
import Permission from "../middlewares/permission";

class CommentController {
    private commentDao: CommentDAO;

    constructor(commentDao: CommentDAO) {
        this.commentDao = commentDao;
    }

    async getAllComments(req: Request, res: Response){
        try{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const videoSelected = req.query.comment as string;
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let allComments = await this.commentDao.getAllComments(videoSelected);
                        response = {allComments};
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json({message: "No Comments found."})
                    }
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error: "An error occurred in server."})
        }
    }

    async postNewComment(req: Request, res: Response){
        try{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const {videoid, date, text} = req.body;
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let newComment = await this.commentDao.postNewComment(videoid, date, text, isValid.value.userId);
                        response = {newComment};
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json({message: "No Comments found."})
                    }
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error: "An error occurred in server."})
        }
    }
}

export{
    CommentController
}
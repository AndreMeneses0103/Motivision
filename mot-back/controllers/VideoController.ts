import VideoDAO from "../models/DAO/VideoDAO";
import { Request, Response } from "express";
import Permission from "../middlewares/permission";

class VideoController {
    private videoDao: VideoDAO;

    constructor(videoDao: VideoDAO) {
        this.videoDao = videoDao;
    }
    
    async getAllVideos(req: Request, res: Response){
        try{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                // console.log(isValid);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid};
                    }else{
                        let videos = await this.videoDao.getAllVideos();
                        response = {videos};
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json({message: "No videos found"});
                    }
                    
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            } else {
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch (error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."})
        }
    }

    async searchVideo(req: Request, res: Response){
        try{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const allvideos = typeof req.query.videos === 'string' ? req.query.videos.split(',') : [];
            console.log(allvideos);
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                // console.log(isValid);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let videos = await this.videoDao.getVideo(allvideos);
                        response = {videos}
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json({message: "No video found"})
                    }
                    
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            } else {
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch (error){
            console.error(error);
            res.status(500).json({error: "An error occurred in server."})
        }
    }

    async getSource(req: Request, res: Response){
        try{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const video = req.query.video as string;
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response:object|string|null;
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let videos = await this.videoDao.getSource(video);
                        response = videos
                    }
                    if(response){
                        res.header('Content-Type', 'video/mp4');
                        res.status(200).sendFile(response as string);
                    }else{
                        res.status(404).json({message: "No video found"});
                    }
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            } else {
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch (error){
            console.error(error);
            res.status(500).json({error: "An error occurred in server."})
        }
    }
}

export{
    VideoController
}
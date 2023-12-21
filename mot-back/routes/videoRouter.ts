import express, { Router, Request, Response } from "express";
import VideoDAO from "../models/DAO/VideoDAO";
import Database from "../database";
import Permission from "../middlewares/permission";

export default class videoRouter {
    private route: Router;
    private data: VideoDAO;

    constructor(database: Database) {
        this.route = express.Router();
        this.data = new VideoDAO(database);
        this.configRouter();
    }

    private configRouter(): void {
        this.route.get("/all", async (req: Request, res: Response) => {
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                // console.log(isValid);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let videos = await this.data.getAllVideos();
                        response = {videos}
                    }
                    res.json(response);
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            } else {
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        });

        this.route.get("/search", async (req: Request, res: Response) => {
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
                        let videos = await this.data.getVideo(allvideos);
                        response = {videos}
                    }
                    res.json(response);
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            } else {
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        });

        this.route.get("/source", async (req: Request, res: Response) => {
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const video = req.query.video as string;
            console.log(video);
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response:object|string|null;
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let videos = await this.data.getSource(video);
                        response = videos
                    }
                    console.log(response);
                    res.sendFile(response as string);
                    // res.json(response);
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            } else {
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        });
    }

    public getRouter(): Router {
        return this.route;
    }
}

import express, { Router, Request, Response } from "express";
import VideoDAO from "../models/DAO/VideoDAO";
import Database from "../database";

export default class videoRouter{
    private route: Router;
    private data: VideoDAO;

    constructor(database:Database){
        this.route = express.Router();
        this.data = new VideoDAO(database);
        this.configRouter();
    }

    private configRouter(): void {
        this.route.get("/all", async (req: Request,res:Response)=>{
            const users = await this.data.getAllVideos();
            res.json(users);
        });
    }

    public getRouter(): Router{
        return this.route;
    }
}
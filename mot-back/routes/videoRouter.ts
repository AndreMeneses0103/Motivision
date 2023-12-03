import express, { Router, Request, Response } from "express";
import VideoDAO from "../models/DAO/VideoDAO";
import Database from "../database";
import authToken from "../middlewares/authToken";
import createKey from "../middlewares/createKey";

export default class videoRouter{
    private route: Router;
    private data: VideoDAO;

    constructor(database:Database){
        this.route = express.Router();
        this.data = new VideoDAO(database);
        this.configRouter();
    }

    private configRouter(): void {
        this.route.get("/all", async (req: Request, res: Response) => {
            const token = req.headers.value;

            const tokenString = Array.isArray(token) ? token[0] : token;

            if (tokenString === undefined) {
                return res.status(401).json({ auth: false, message: 'Token inexistente' });
            }

            const generator = new createKey();
            const key = generator.generateKey();
            const autorizer = new authToken();
            const verify = await autorizer.validate(tokenString, key);

            console.log("VERIFY:", verify);
            
            const users = await this.data.getAllVideos();
            res.json(users);

        });
    }

    public getRouter(): Router{
        return this.route;
    }
}
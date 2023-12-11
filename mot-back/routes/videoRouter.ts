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
            const allTokens = req.headers.authorization;
            if (allTokens) {
                const pm = new Permission();
                const isValid = await pm.getPermission(allTokens, this.data);
                // console.log(isValid);
                if(isValid.auth === true){
                    let videos = await this.data.getAllVideos();
                    let response = {isValid, videos};
                    res.json(response);
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

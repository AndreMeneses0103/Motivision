import express, { Router, Request, Response } from "express";
import VideoDAO from "../models/DAO/VideoDAO";
import Database from "../database";
import Permission from "../middlewares/permission";
import { VideoController } from "../controllers/VideoController";

export default class videoRouter {
    private route: Router;
    private controller: VideoController;
    private data: VideoDAO;

    constructor(database: Database) {
        this.route = express.Router();
        this.controller = new VideoController(new VideoDAO(database));
        this.data = new VideoDAO(database);
        this.configRouter();
    }

    private configRouter(): void {
        this.route.get("/all", this.controller.getAllVideos.bind(this.controller));

        this.route.get("/search", this.controller.searchVideo.bind(this.controller));

        this.route.get("/source", this.controller.getSource.bind(this.controller));

        this.route.get("/subscribed", this.controller.getSubscribedVideos.bind(this.controller));
    }

    public getRouter(): Router {
        return this.route;
    }
}

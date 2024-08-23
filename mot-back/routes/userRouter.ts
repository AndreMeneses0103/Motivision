import express, { Router, Request, Response } from "express";
import UserDAO from "../models/DAO/UserDAO";
import Database from "../database";
import Permission from "../middlewares/permission";
import multer, { Multer } from "multer";
import { UserController } from "../controllers/UserController";
import VideoDAO from "../models/DAO/VideoDAO";

export default class userRouter {
    private route: Router;
    private upload: Multer;
    private controller: UserController;
    constructor(database: Database) {
        this.route = express.Router();
        this.upload = multer({storage: multer.memoryStorage()});
        this.controller = new UserController(new UserDAO(database), new VideoDAO(database));
        this.configRouter();
    }
    private configRouter(): void {
        this.route.get("/all", this.controller.getAllUsers.bind(this.controller));

        this.route.post("/postUserCredentials", this.controller.postUserByCredentials.bind(this.controller));

        this.route.get("/getEmailInfo", this.controller.getUserByEmail.bind(this.controller));

        this.route.get("/getIdsInfos", this.controller.getUsersByIds.bind(this.controller));

        this.route.get("/getIdInfo", this.controller.getUserById.bind(this.controller));

        this.route.get("/getNameInfo",this.controller.getUserByName.bind(this.controller));

        this.route.get("/getRegisteredName", this.controller.getRegistersByName.bind(this.controller));

        this.route.get("/getRegisteredEmail", this.controller.getRegistersByEmail.bind(this.controller));

        this.route.post("/postRegisterUser",this.upload.single('file') , this.controller.postRegisterUser.bind(this.controller));

        this.route.post("/postNewView", this.controller.postNewView.bind(this.controller));

        this.route.post("/postLike", this.controller.postLike.bind(this.controller));

        this.route.post("/postDislike", this.controller.postDislike.bind(this.controller));

        this.route.post("/postSubscription", this.controller.postSubscription.bind(this.controller));
    }

    public getRouter(): Router{
        return this.route;
    }
}
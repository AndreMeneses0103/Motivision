import express, { Router, Request, Response } from "express";
import UserDAO from "../models/DAO/UserDAO";
import Database from "../database";
import Permission from "../middlewares/permission";
import { UserController } from "../controllers/UserController";

export default class userRouter {
    private route: Router;
    private controller: UserController;
    private data: UserDAO;
    constructor(database: Database) {
        this.route = express.Router();
        this.controller = new UserController(new UserDAO(database));
        this.data = new UserDAO(database);
        this.configRouter();
    }
    private configRouter(): void {
        this.route.get("/all", this.controller.getAllUsers.bind(this.controller));

        this.route.post("/postUserCredentials", this.controller.postUserByCredentials.bind(this.controller));

        this.route.get("/getEmailInfo", this.controller.getUserByEmail.bind(this.controller));

        this.route.get("/getIdsInfos", this.controller.getUsersByIds.bind(this.controller));

        this.route.get("/getIdInfo", this.controller.getUserById.bind(this.controller));

        this.route.get("/getNameInfo",this.controller.getUserByName.bind(this.controller));
    }

    public getRouter(): Router{
        return this.route;
    }
}
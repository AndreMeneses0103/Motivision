import express, { Router, Request, Response } from "express";
import CommentDAO from "../models/DAO/CommentDAO";
import Database from "../database";
import { CommentController } from "../controllers/CommentController";

export default class CommentRouter{
    private route: Router;
    private controller: CommentController;
    constructor(database: Database) {
        this.route = express.Router();
        this.controller = new CommentController(new CommentDAO(database));
        this.configRouter();
    }

    //CONTINUAR CONFIGROUTER
    private configRouter(): void{
        this.route.get("/allComments", this.controller.getAllComments.bind(this.controller));
        this.route.post("/newComment", this.controller.postNewComment.bind(this.controller))
    }

    public getRouter(): Router{
        return this.route;
    }
}
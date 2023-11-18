import express, { Router, Request, Response } from "express";
import UserDAO from "../models/DAO/UserDAO";
import Database from "../database";

export default class userRouter {
    private route: Router;
    private data: UserDAO;
    constructor(database: Database) {
        this.route = express.Router();
        this.data = new UserDAO(database);
        this.configRouter();
    }
    private configRouter(): void {
        this.route.get("/all", async (req: Request,res:Response)=>{
            const users = await this.data.getAllUsers();
            res.json(users);
        });

        this.route.get("/info", async (req: Request,res:Response)=>{
            const email = req.query.email as string;
            const users = await this.data.getUserByEmail(email);
            res.json(users);
        });

        this.route.get("/info", async (req: Request,res:Response)=>{
            const nome = req.query.nome as string;
            const users = await this.data.getUserByName(nome);
            res.json(users);
        });
    }

    public getRouter(): Router{
        return this.route;
    }
}
// const rota = new testeRouter();
// export default rota.getRouter();
import express, { Router, Request, Response } from "express";
import TesteDAO from "../models/DAO/Teste";
import Database from "../database";

export default class testeRouter {
    private route: Router;
    private data: TesteDAO;
    constructor(database: Database) {
        this.route = express.Router();
        this.data = new TesteDAO(database);
        this.configRouter();
    }
    private configRouter(): void {
        this.route.get("/", async (req: Request,res:Response)=>{
            const users = await this.data.getAllUsers();
            res.json(users);
        });
    }

    public getRouter(): Router{
        return this.route;
    }
}
// const rota = new testeRouter();
// export default rota.getRouter();
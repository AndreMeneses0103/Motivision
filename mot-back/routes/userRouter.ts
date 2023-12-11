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
            const allTokens = req.headers.authorization;
            if(allTokens){
                
            }
            const users = await this.data.getAllUsers();
            res.json(users);
        });

        this.route.post("/postUserCredentials",async (req:Request, res:Response) => {           
            const {name, password} = req.body;
            const user = await this.data.postUserByCredentials(name,password);
            res.json(user);
        });

        this.route.get("/getEmailInfo", async (req: Request,res:Response)=>{
            const email = req.query.email as string;
            const users = await this.data.getUserByEmail(email);
            res.json(users);
        });

        this.route.get("/getNameInfo", async (req: Request,res:Response)=>{
            const nome = req.query.name as string;
            console.log(nome);
            const users = await this.data.getUserByName(nome);
            res.json(users);
        });
    }

    public getRouter(): Router{
        return this.route;
    }
}
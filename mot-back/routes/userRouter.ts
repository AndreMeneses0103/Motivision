import express, { Router, Request, Response } from "express";
import UserDAO from "../models/DAO/UserDAO";
import Database from "../database";
import Permission from "../middlewares/permission";

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
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let allUsers = await this.data.getAllUsers();
                    let response = [isValid, allUsers];
                    res.json(response);
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        });

        this.route.post("/postUserCredentials",async (req:Request, res:Response) => {           
            const {name, password} = req.body;
            const user = await this.data.postUserByCredentials(name,password);
            res.json(user);
        });

        this.route.get("/getEmailInfo", async (req: Request,res:Response)=>{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            if(access && refresh){
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    const email = req.query.email as string;
                    const users = await this.data.getUserByEmail(email);
                    res.json(users);
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
            
        });

        this.route.get("/getIdInfo", async (req: Request,res:Response)=>{
            const id = req.query.id as string;
            const users = await this.data.getUserById(id);
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
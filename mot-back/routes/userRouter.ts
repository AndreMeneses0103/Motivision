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
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let allUsers = await this.data.getAllUsers();
                        response = {allUsers};
                    }
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

        this.route.get("/getIdsInfos", async(req: Request, res:Response)=>{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const userSelected = req.query.users as string;
            const allUsers = userSelected.split(",");
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        // console.log(isValid.value);
                        const user = await this.data.getUsersByIds(allUsers);
                        response = {user};
                    }
                    res.json(response);
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        })

        this.route.get("/getIdInfo", async (req: Request,res:Response)=>{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const userSelected = req.query.user as string;
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        // console.log(isValid.value);
                        const user = await this.data.getUserById(userSelected);
                        response = {user};
                    }
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

        this.route.get("/getNameInfo", async (req: Request,res:Response)=>{
            const nome = req.query.name as string;
            const users = await this.data.getUserByName(nome);
            res.json(users);
        });
    }

    public getRouter(): Router{
        return this.route;
    }
}
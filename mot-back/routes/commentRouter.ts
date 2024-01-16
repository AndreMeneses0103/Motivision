import express, { Router, Request, Response } from "express";
import CommentDAO from "../models/DAO/CommentDAO";
import Database from "../database";
import Permission from "../middlewares/permission";

export default class CommentRouter{
    private route: Router;
    private data: CommentDAO;
    constructor(database: Database) {
        this.route = express.Router();
        this.data = new CommentDAO(database);
        this.configRouter();
    }

    //CONTINUAR CONFIGROUTER
    private configRouter(): void{
        this.route.get("/allComments", async (req: Request,res:Response)=>{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const videoSelected = req.query.comment as string;
            if (access && refresh) {
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        let allComments = await this.data.getAllComments(videoSelected);
                        response = {allComments};
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
    }

    public getRouter(): Router{
        return this.route;
    }
}
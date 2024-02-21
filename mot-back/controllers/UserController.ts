import UserDAO from "../models/DAO/UserDAO";
import { Request, Response } from "express";
import Permission from "../middlewares/permission";

class UserController{
    private userDao: UserDAO;

    constructor(userDao: UserDAO){
        this.userDao = userDao;
    }

    async getAllUsers(req: Request, res: Response){
        try{
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
                        let allUsers = await this.userDao.getAllUsers();
                        response = {allUsers};
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json("No users found");
                    }
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error: "An error occurred in server."})
        }
        
    }

    async postUserByCredentials(req: Request, res: Response){
        try{
            const {name, password} = req.body;
            const user = await this.userDao.postUserByCredentials(name,password);
            if(user){
                res.status(200).json(user);
            }else{
                res.status(404).json({message:"User not found"})
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."})
        }
    }

    async getUserByEmail(req: Request, res: Response){
        try{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            if(access && refresh){
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    const email = req.query.email as string;
                    const users = await this.userDao.getUserByEmail(email);
                    if(users){
                        res.status(200).json(users);
                    }else{
                        res.status(404).json({message: "User not found"});
                    }
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch (error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."})
        }
        
    }

    async getUsersByIds(req: Request, res: Response){
        try{
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
                        const user = await this.userDao.getUsersByIds(allUsers);
                        response = {user};
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json({message:"User not found"});
                    }
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."})
        }
    }

    async getUserById(req: Request, res: Response){
        try{
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
                        const user = await this.userDao.getUserById(userSelected);
                        response = {user};
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json({message:"User not found"});
                    }
                }else{
                    res.status(401).json({auth:false, message:"Both tokens are not valid. Please login again."});
                }
            }else{
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error: "An error occurred in server."})
        }
    }

    async getUserByName(req:Request, res: Response){
        try{
            const access = req.headers.authorization;
            const refresh = req.headers['refresh-token'];
            const nome = req.query.name as string;
            if (access && refresh){
                const pm = new Permission();
                const isValid = await pm.getPermission(`${access}, ${refresh}`);
                if(isValid.auth === true){
                    let response = {};
                    if(isValid.newAccessToken){
                        response = {isValid}
                    }else{
                        // console.log(isValid.value);
                        const user = await this.userDao.getUserByName(nome);
                        response = {user};
                    }
                    if(response){
                        res.status(200).json(response);
                    }else{
                        res.status(404).json({message:"User not found"});
                    }
                }
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."})
        }
    }

    async getRegistersByName(req:Request, res: Response){
        try{
            const nome = req.query.name as string;
            let response = {};
            const user = await this.userDao.getRegistersByName(nome);
            response = {user};
            
            if(response){
                res.status(200).json(response);
            }else{
                res.status(404).json({message:"User not found"});
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."})
        }
    }

    async getRegistersByEmail(req:Request, res: Response){
        try{
            const email = req.query.email as string;
            let response = {};
            const user = await this.userDao.getRegistersByEmail(email);
            response = {user};
            if(response){
                res.status(200).json(response);
            }else{
                res.status(404).json({message:"User not found"});
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."})
        }
    }
}

export{
    UserController
}
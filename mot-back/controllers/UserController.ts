import UserDAO from "../models/DAO/UserDAO";
import { Request, Response } from "express";
import Permission from "../middlewares/permission";
import User from "../models/DTO/User";
import VideoDAO from "../models/DAO/VideoDAO";
import UserSetting from "../models/DTO/UserSetting";

class UserController{
    private userDao: UserDAO;
    private videoDao: VideoDAO;

    constructor(userDao: UserDAO, videoDao: VideoDAO){
        this.userDao = userDao;
        this.videoDao = videoDao;
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

    async postSubscription(req: Request, res: Response){
        try{
            const {channel, user} = req.body;
            if(!channel || !user){
                return res.status(400).json({
                    error:"Missing content in body"
                })
            }
            const user_s_settings = new UserSetting(
                user.usersettings.userid,
                user.usersettings.name,
                user.usersettings.email,
            )
            const user_s = new User(
                user_s_settings,
                user.videos,
                user.watched_videos,
                user.liked_videos,
                user.disliked_videos,
                user.subscribed,
                user.subscribers,
                user.nickname
            )
            const subs = await this.userDao.manageSubscription(channel, user_s);
            if(subs){
                return res.status(200).json({
                    success: true,
                    status: subs.status,
                    message: subs.status == 0 ? "Unsubscribed successfully" : "Subscribed successfully"
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: "An error occurred to manage subscription"
                })
            }
        }catch(error){
            console.error("Error in postSubscription:", error);
        }
    }

    async postNewView(req: Request, res: Response){
        try{
            const {videoid, user} = req.body;

            if(!videoid || !user){
                return res.status(400).json({
                    error: "Missing content in body."
                })
            }
            const user_s_settings = new UserSetting(
                user.usersettings.userid,
                user.usersettings.name,
                user.usersettings.email,
            )
            const user_s = new User(
                user_s_settings,
                user.videos,
                user.watched_videos,
                user.liked_videos,
                user.disliked_videos,
                user.subscribed,
                user.subscribers,
                user.nickname
            )
            const new_view = await this.userDao.countView(videoid, user_s, this.videoDao);
            if(new_view){
                return res.status(200).json({success:true});
            }else{
                return res.status(200).json({success:false, error: "View couldn't be counted, this video might already be watched by the user."});
            }
        }catch(error){
            console.error("Error in postNewView:", error);
            return res.status(500).json({error: "An error occurred in server."})
        }
    }

    async postLike(req: Request, res: Response){
        try{
            const {videoid, user} = req.body;

            if(!videoid || !user){
                return res.status(400).json({
                    error: "Missing content in body."
                })
            }
            const user_s_settings = new UserSetting(
                user.usersettings.userid,
                user.usersettings.name,
                user.usersettings.email,
            )
            const user_s = new User(
                user_s_settings,
                user.videos,
                user.watched_videos,
                user.liked_videos,
                user.disliked_videos,
                user.subscribed,
                user.subscribers,
                user.nickname
            )
            const new_like = await this.userDao.countLike(videoid, user_s, this.videoDao);
            if(new_like){
                return res.status(200).json({success:true});
            }else{
                return res.status(404).json({error: "An error occurred to manage Like."});
            }
        }catch(error){
            console.error("Error in postLike:", error);
            return res.status(500).json({error: "An error occurred in server."})
        }
    }
    
    async postDislike(req: Request, res: Response){
        try{
            const {videoid, user} = req.body;

            if(!videoid || !user){
                return res.status(400).json({
                    error: "Missing content in body."
                })
            }
            const user_s_settings = new UserSetting(
                user.usersettings.userid,
                user.usersettings.name,
                user.usersettings.email,
            )
            const user_s = new User(
                user_s_settings,
                user.videos,
                user.watched_videos,
                user.liked_videos,
                user.disliked_videos,
                user.subscribed,
                user.subscribers,
                user.nickname
            )
            const new_dislike = await this.userDao.countDislike(videoid, user_s, this.videoDao);
            if(new_dislike){
                return res.status(200).json({success:true});
            }else{
                return res.status(404).json({error: "An error occurred to manage Dislike."});
            }
        }catch(error){
            console.error("Error in postDislike:", error);
            return res.status(500).json({error: "An error occurred in server."})
        }
    }

    async postRegisterUser(req: Request, res: Response){
        try{
            const formData = req.body;
            const new_user = await this.userDao.postRegisterUser(formData, req.file);
            if(new_user){
                res.status(200).json({success: true,
                data:new_user});
            }else{
                res.status(404).json({success: false});
            }
        }catch(error){
            console.error(error);
            res.status(500).json({error:"An error occurred in server."});
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
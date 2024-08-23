import { Collection, MongoClient } from "mongodb";
import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import User from "../DTO/User";
import UserSetting from "../DTO/UserSetting";
import Database from "../../database";
import createKey from "../../middlewares/createKey";
import * as fs from "fs";
import path from "path";
import { VideoController } from "../../controllers/VideoController";
import VideoDAO from "./VideoDAO";
import { SubscriptionResponse } from "../../types/userTypes";
export default class UserDAO {
    private collection: Collection;
    constructor(database: Database) {
        this.collection = database.getclient
            .db("motivision")
            .collection("users");
    }

    private encrypt(pass: string): string {
        const hash = crypto.createHash("sha512");
        hash.update(pass);
        return hash.digest("hex");
    }

    private encodeImageToBase64(imagePath: string): string {
        try {
            const imageBuffer = fs.readFileSync(imagePath);
            return imageBuffer.toString("base64");
        } catch (error) {
            console.error(`Erro ao converter imagem: ${error}`);
            return "ERROR";
        }
    }

    public async getAllUsers(): Promise<User[] | null> {
        const result = await this.collection.find().toArray();
        if (result && result.length > 0) {
            return result.map((item) => item.user);
        } else {
            return null;
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        const result = await this.collection.findOne(
            { "user.user_settings.userid": id },
            { projection: { _id: 0 } }
        );

        if (result && result.user) {
            const userData = result.user;
            const rightPath = path.resolve(
                __dirname,
                "../../midia/photos/users"
            );
            const thumbPath = rightPath + "/" + userData.photo;
            const convert64 = this.encodeImageToBase64(thumbPath);

            const userSettings = new UserSetting(
                userData.user_settings.userid,
                userData.user_settings.name,
                userData.user_settings.email
            );
            const users = new User(
                userSettings,
                userData.videos || null,
                userData.watched_videos,
                userData.liked_videos,
                userData.disliked_videos,
                userData.subscribed || null,
                userData.subscribers || 0,
                userData.nickname,
                convert64
            )
            return users;
        } else {
            return null;
        }
    }

    public async getUsersByIds(ids: Array<string>): Promise<User[] | null> {
        const result = await this.collection.find(
            { "user.user_settings.userid": { $in: ids } },
            { projection: { _id: 0 } }
        ).toArray();

        if (result) {
            const userData = result.map(doc => doc.user);
            const rightPath = path.resolve(
                __dirname,
                "../../midia/photos/users"
            );
            const thumbPaths = userData.map(user => path.join(rightPath, user.photo));
            const convert64Array = thumbPaths.map(thumbPath => this.encodeImageToBase64(thumbPath));

            const users: User[] = userData.map((user, index) => {
                const userSettings = new UserSetting(
                    user.user_settings.userid,
                    user.user_settings.name,
                    user.user_settings.email
                );
                const newUser = new User(
                    userSettings,
                    user.videos || [],
                    user.watched_videos || [],
                    user.liked_videos || [],
                    user.disliked_videos || [],
                    user.subscribed || [],
                    user.subscribers || 0,
                    user.nickname,
                    convert64Array[index]
                );
            
                return newUser;
            });

            return users;
        } else {
            return null;
        }
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const result = await this.collection.findOne(
            { "user.user_settings.email": email },
            { projection: { _id: 0 } }
        );
        
        if (result && result.user) {
            const userData = result.user;
            const rightPath = path.resolve(
                __dirname,
                "../../midia/photos/users"
            );
            const thumbPath = rightPath + "/" + userData.photo;
            const convert64 = this.encodeImageToBase64(thumbPath);

            const userSettings = new UserSetting(
                userData.user_settings.userid,
                userData.user_settings.name,
                userData.user_settings.email
            );
            const users = new User(
                userSettings,
                userData.videos || null,
                userData.watched_videos,
                userData.liked_videos,
                userData.disliked_videos,
                userData.subscribed || null,
                userData.subscribers || 0,
                userData.nickname,
                convert64
            )

            return users;
        } else {
            return null;
        }
    }

    public async getUserByName(name: string): Promise<User | null> {
        const result = await this.collection.findOne(
            { "user.user_settings.name": name },
            { projection: { _id: 0 } }
        );

        if (result && result.user) {
            const userData = result.user;
            const rightPath = path.resolve(
                __dirname,
                "../../midia/photos/users"
            );
            const thumbPath = rightPath + "/" + userData.photo;
            const convert64 = this.encodeImageToBase64(thumbPath);

            const userSettings = new UserSetting(
                userData.user_settings.userid,
                userData.user_settings.name,
                userData.user_settings.email
            );
            const users = new User(
                userSettings,
                userData.videos || null,
                userData.watched_videos,
                userData.liked_videos,
                userData.disliked_videos,
                userData.subscribed || null,
                userData.subscribers || 0,
                userData.nickname,
                convert64
            )
            return users;
        } else {
            return null;
        }
    }

    public async getRegistersByName(name: string): Promise<Boolean>{
        const result = await this.collection.findOne(
            { "user.user_settings.name": name },
            { projection: { _id: 0 } }
        );

        if(result && result.user){
            return true;
        }

        return false;
    }

    public async getRegistersByEmail(email: string): Promise<Boolean>{
        const result = await this.collection.findOne(
            { "user.user_settings.email": email },
            { projection: { _id: 0 } }
        );

        if(result && result.user){
            return true;
        }

        return false;
    }

    public async postUserByCredentials(
        name: string,
        password: string
    ): Promise<Object | null> {
        const result = await this.collection.findOne(
            {
                "user.user_settings.name": name,
                "user.user_settings.password": this.encrypt(password),
            },
            { projection: { _id: 0 } }
        );

        if (result && result.user) {
            const generator = new createKey();
            
            const accessTokenKey = generator.generateAccessKey();
            const refreshTokenKey = generator.generateRefreshKey();
        
            const accessTokenDuration = "15min";
            const refreshTokenDuration = "7d";
        
            const accessTokenPayload = { userId: result.user.user_settings.userid };
            const refreshTokenPayload = { userId: result.user.user_settings.userid };
        
            const accessToken = jwt.sign(accessTokenPayload, accessTokenKey, { expiresIn: accessTokenDuration });
            const refreshToken = jwt.sign(refreshTokenPayload, refreshTokenKey, { expiresIn: refreshTokenDuration });
        
            return {
                success: true,
                message: "Successfully Login!",
                user: result.user.user_settings.userid,
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        } else {
            return {
                success: false,
                message: "An error occurred in login, please review the information.",
            };
        }
    }

    public async postRegisterUser(formData: any, file:any): Promise<Object|null>{
        const name = formData.name;
        const email = formData.email;
        const password = formData.password;
        const channel = formData.channel;
        let userid = Math.floor(Math.random() * 1e16).toString(36).substring(0, 6);
        const new_photo = await this.saveBlobToMedia(file.buffer, userid);

        const new_user = {
            user: {
                user_settings: {
                    userid: userid,
                    name: name,
                    email: email,
                    password: this.encrypt(password)
                },
                videos: [
                ],
                watched_videos: [
                ],
                liked_videos: [
                ],
                disliked_videos: [
                ],
                subscribed: [
                ],
                subscribers: 0,
                photo: new_photo,
                nickname: channel
            }
        };

        const insert = await this.collection.insertOne(new_user);

        if(insert){
            return new_user;
        }else{
            return null;
        }
        
    }

    public async manageSubscription(channelId: string, user_s: User): Promise<SubscriptionResponse|null>{
        const alreadySubscribed = user_s.getSubscribed.includes(channelId);
        try{
            const updateOperator = alreadySubscribed === false
                ? { $push: { "user.subscribed": channelId } }
                : { $pull: { "user.subscribed": channelId } };
                
            const updateResult = await this.collection.updateOne(
                {"user.user_settings.userid": user_s.getUserSettings.getUserId},
                updateOperator
            );
            if(updateResult){
                return {
                    success: true,
                    status: alreadySubscribed ? 0 : 1,
                    message: alreadySubscribed ? "Subscribed successfully" : "Unsubscribed successfully"
                };
            }else{
                return {
                    success: false,
                    message: "No changes were made"
                };
            }
        }catch(error){
            console.error("Error in manageSubscription:", error);
            return {
                success: false,
                message: "An error occurred during the operation"
            };
        }
    }

    public async countView(videoid: string, user_s: User, videoDao: VideoDAO): Promise<boolean>{
        if((user_s.getWatched_videos).includes(videoid)){
            return false;
        }
        try{
            const isViewAdded = await videoDao.addView(videoid);
            if(isViewAdded){
                const updateResult = await this.collection.updateOne(
                    {"user.user_settings.userid": user_s.getUserSettings.getUserId},
                    {
                        $push:{
                            "user.watched_videos": videoid
                        }
                    }
                )
                if(updateResult){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }catch(error){
            console.error("Error in countView:", error);
            return false;
        }
    }

    public async countLike(videoid: string, user_s: User, videoDao: VideoDAO): Promise<boolean>{
        let alreadyLiked = true;
        if((user_s.getLiked_Videos).includes(videoid)){
            alreadyLiked = false;
        }
        try{
            const isLikeAdded = await videoDao.manageLike(videoid, alreadyLiked);
            if(isLikeAdded !== -1){
                const updateOperator = isLikeAdded === 0
                    ? { $push: { "user.liked_videos": videoid } }
                    : { $pull: { "user.liked_videos": videoid } };
                    
                const updateResult = await this.collection.updateOne(
                    {"user.user_settings.userid": user_s.getUserSettings.getUserId},
                    updateOperator
                );
                if(updateResult){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }catch(error){
            console.error("Error in countLike:", error);
            return false;
        }
    }

    public async countDislike(videoid: string, user_s: User, videoDao: VideoDAO): Promise<boolean>{
        let alreadyDisliked = true;
        if((user_s.getDisliked_Videos).includes(videoid)){
            alreadyDisliked = false;
        }
        try{
            const isDislikeAdded = await videoDao.manageDislike(videoid, alreadyDisliked);
            if(isDislikeAdded !== -1){
                const updateOperator = isDislikeAdded === 0
                    ? { $push: { "user.disliked_videos": videoid } }
                    : { $pull: { "user.disliked_videos": videoid } };
                    
                const updateResult = await this.collection.updateOne(
                    {"user.user_settings.userid": user_s.getUserSettings.getUserId},
                    updateOperator
                );
                if(updateResult){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }catch(error){
            console.error("Error in countDislike:", error);
            return false;
        }
    }

    private async saveBlobToMedia(blobContent: Buffer, userid: string){
        const rightPath = path.resolve(__dirname,"../../midia/photos/users");
        const photo_path = rightPath+`/pic_${userid}.png`;
        await fs.promises.writeFile(photo_path, blobContent);
        return `pic_${userid}.png`;
    }
}

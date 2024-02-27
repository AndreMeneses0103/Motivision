import { Collection, MongoClient } from "mongodb";
import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import User from "../DTO/User";
import UserSetting from "../DTO/UserSetting";
import Database from "../../database";
import createKey from "../../middlewares/createKey";
import * as fs from "fs";
import path from "path";
import axios from "axios";
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
            // console.log(userData.map(doc => doc.photo));
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
                subscribed: [
                ],
                subscribers: 0,
                photo: new_photo,
                nickname: channel
            }
        };
        
        return new_user;
    }

    private async saveBlobToMedia(blobContent: Buffer, userid: string){
        const rightPath = path.resolve(__dirname,"../../midia/photos/users");
        const photo_path = rightPath+`/pic_${userid}.jpg`;
        await fs.promises.writeFile(photo_path, blobContent);
        return `pic_${userid}`;
    }
}

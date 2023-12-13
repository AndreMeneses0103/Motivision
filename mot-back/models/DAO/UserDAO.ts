import { Collection, MongoClient } from "mongodb";
import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import User from "../DTO/User";
import UserSetting from "../DTO/UserSetting";
import Database from "../../database";
import createKey from "../../middlewares/createKey";
import * as fs from "fs";
import path from "path";

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
            console.log(userData);
            const rightPath = path.resolve(
                __dirname,
                "../../midia/photos/users"
            );
            const thumbPath = rightPath + "/" + userData.photo;
            const convert64 = this.encodeImageToBase64(thumbPath);

            const userSettings = new UserSetting(
                userData.user_settings.name,
                userData.user_settings.email,
                userData.user_settings.password
            );

            const user = new User(
                userSettings,
                userData.videos || [],
                userData.watched_videos || [],
                userData.subscribed || [],
                userData.subscribers || 0,
                convert64
            );

            return user;
        } else {
            return null;
        }
    }

    public async getUserByEmail(email: string): Promise<User[] | null> {
        const result = await this.collection.findOne(
            { "user.user_settings.email": email },
            { projection: { _id: 0 } }
        );
        if (result && result.user) {
            return result.user;
        } else {
            return null;
        }
    }

    public async getUserByName(name: string): Promise<User[] | null> {
        const result = await this.collection.findOne(
            { "user.user_settings.name": name },
            { projection: { _id: 0 } }
        );

        if (result && result.user) {
            return result.user;
        } else {
            return null;
        }
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
            const key = generator.generateAccessKey();
            const key2 = generator.generateRefreshKey();
            const accessToken = jwt.sign(
                { userId: result.user.user_settings.userid },
                key,
                { expiresIn: "10sec" }
            );
            const refreshToken = jwt.sign(
                { userId: result.user.user_settings.userid },
                key2,
                { expiresIn: "7d" }
            );
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
                message:
                    "An error occurred in login, please review the informations.",
            };
        }
    }
}

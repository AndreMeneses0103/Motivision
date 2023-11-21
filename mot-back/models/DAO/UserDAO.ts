import { Collection, MongoClient } from "mongodb";
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import User from "../DTO/User";
import Database from "../../database";

export default class UserDAO {
    private collection: Collection;
    constructor(database: Database) {
        this.collection = (database.getclient.db("motivision")).collection("users");
    }

    private encrypt(pass:string): string{
        const hash = crypto.createHash('sha512');
        hash.update(pass);
        return hash.digest('hex');
    }

    public async getAllUsers(): Promise<User[] | null> {
        const result = await this.collection.find().toArray();
        if (result && result.length > 0) {
            return result.map(item=>item.user);
        } else {
            return null;
        }
    }

    public async getUserByEmail(email:string): Promise<User[] | null> {
        const result = await this.collection.findOne({"user.user_settings.email": email},{"projection": {"_id": 0}});
        if (result && result.user) {
            return result.user;
        } else {
            return null;
        }
    }
    
    public async getUserByName(name:string): Promise<User[] | null> {
        const result = await this.collection.findOne({"user.user_settings.name": name},{"projection": {"_id": 0}});
        
        if (result && result.user) {
            return result.user;
        } else {
            return null;
        }
    }

    public async postUserByCredentials(name:string, password:string): Promise<Object | null> {

        const result = await this.collection.findOne({"user.user_settings.name": name, "user.user_settings.password": this.encrypt(password)}, {"projection":{"_id":0}});

        if(result && result.user){
            const key =  crypto.randomBytes(32).toString('hex');
            const usertoken = jwt.sign({ userId: result.user.user_settings.userid }, key, { expiresIn: '1h' });
            return {
                success:true,
                message:"Successfully Login!",
                user:result.user.user_settings.userid,
                token:usertoken
            };
        }else{
            return {
                success: false,
                message:"An error occurred in login, please review the informations."
            };
        }
    }
}
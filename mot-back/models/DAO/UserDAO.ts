import { Collection, MongoClient } from "mongodb";
import User from "../DTO/User";
import Database from "../../database";

export default class UserDAO {
    private collection: Collection;
    constructor(database: Database) {
        this.collection = (database.getclient.db("motivision")).collection("motivision");
    }

    public async getAllUsers(): Promise<User[] | null> {
        const result = await this.collection.find().toArray();
    
        if (result && result.length > 0) {
            return result[0].users;
        } else {
            return null;
        }
    }

    public async getUserByEmail(email:string): Promise<User[] | null> {
        const result = await this.collection.findOne({"users.user_settings.email": email},{"projection": {"_id": 0, "users.$": 1}});
        
        if (result && result.users) {
            return result.users;
        } else {
            return null;
        }
    }
    
    public async getUserByName(name:string): Promise<User[] | null> {
        const result = await this.collection.findOne({"users.user_settings.userid": name},{"projection": {"_id": 0, "users.$": 1}});
        
        if (result && result.users) {
            return result.users;
        } else {
            return null;
        }
    }
}
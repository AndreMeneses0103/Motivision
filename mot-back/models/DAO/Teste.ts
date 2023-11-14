import { Collection, MongoClient } from "mongodb";
import User from "../DTO/User";
import Database from "../../database";

export default class TesteDAO {
    private collection: Collection;
    constructor(database: Database) {
        this.collection = (database.getclient.db("motivision")).collection("motivision");
    }

    public async getAllUsers(): Promise<User[] | null> {
        const result = await this.collection.find().toArray();
    
        if (result && result.length > 0) {
            return result[0].users; // Assuming the structure has a 'users' property
        } else {
            return null;
        }
    }
    

}
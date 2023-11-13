import { MongoClient } from "mongodb";
import User from "../DTO/User";

export default class TesteDAO {
    private client: MongoClient;
    private id: string;
    private database: string;
    private collection: string;
    constructor(client:MongoClient, id:string) {
        this.client = client;
        this.id = id;
        this.database = "motivision";
        this.collection = "motivision";
    }

    public async getAllUsers(): Promise<User[] | null> {
        const database = this.client.db(this.database);
        const collection = database.collection(this.collection);
        const result = await collection.findOne({users: 1});

        if(result){
            return result.users;
        }else{
            return null;
        }
        // return result ? [result.users] : null;
    }

}
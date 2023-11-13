import { MongoClient } from "mongodb";

export default class Database{
    private client: MongoClient;
    private url: string;

    constructor(url: string) {
        this.url = url
        this.client = new MongoClient(this.url);
    }    

    public async Connection():Promise<void>{
        try{
            await this.client.connect();
            console.log("Connected to database!");
        } catch (err){
            console.error("Error to connect in database: ", err);
        }
    }

    public async disconnect(): Promise<void>{
        try{
            await this.client.close();
            console.log("Database shutdown")
        }catch(err){
            console.error("Error to disconnect: ", err);
        }
    }

    
    public get getclient() : MongoClient {
        return this.client;
    }
    
}
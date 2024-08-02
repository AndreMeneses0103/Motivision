import { MongoClient } from "mongodb";

export default class Database{
    private client: MongoClient;
    private url: string;
    private isConnected: boolean;
    constructor(url: string) {
        this.url = url
        this.client = new MongoClient(this.url);
        this.isConnected = false;
    }   

    public async Connection():Promise<void>{
        try{
            await this.client.connect();
            this.isConnected = true;
            console.log("Connected to database!");
        } catch (err){
            this.isConnected = false;
            console.error("Error to connect in database: ", err);
        }
    }

    public async disconnect(): Promise<void>{
        try{
            await this.client.close();
            this.isConnected = false;
            console.log("Database shutdown")
        }catch(err){
            console.error("Error to disconnect: ", err);
        }
    }

    
    public get getclient() : MongoClient {
        return this.client;
    }
    
    public isDatabaseConnected(): boolean{
        return this.isConnected;
    }
}
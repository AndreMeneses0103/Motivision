import { Collection, MongoClient } from "mongodb";
import Database from "../../database";
import Video from "../DTO/Video";

export default class VideoDAO{
    private collection: Collection;

    constructor(database:Database){
        this.collection = (database.getclient.db("motivision")).collection("videos");
    }

    
    public async getAllVideos(): Promise<Video[] | null> {
        const result = await this.collection.find().toArray();
        if (result && result.length > 0) {
            return result.map(item=>item.video);
        } else {
            return null;
        }
    }
}
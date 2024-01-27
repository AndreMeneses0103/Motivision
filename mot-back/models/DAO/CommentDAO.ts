import { Collection, MongoClient } from "mongodb";
import Database from "../../database";
import Comments from "../DTO/Comment";

export default class CommentDAO{
    private collection: Collection;
    constructor(database: Database) {
        this.collection = database.getclient
            .db("motivision")
            .collection("comments");
    }

    //CORRIGIR OBJECT PARA COMMENT[]
    public async getAllComments(id:string): Promise<Object | null>{
        const result = await this.collection.findOne(
            { "video_id": id },
            { projection: { _id: 0 } }
        );  

        if(result && result.comments){
            return result.comments;
        }else{
            return null;
        }
    }
}
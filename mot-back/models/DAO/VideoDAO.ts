import { Collection, MongoClient } from "mongodb";
import Database from "../../database";
import Video from "../DTO/Video";
import * as fs from 'fs';
import path from 'path';

export default class VideoDAO{
    private collection: Collection;

    constructor(database:Database){
        this.collection = (database.getclient.db("motivision")).collection("videos");
    }

    private encodeImageToBase64(imagePath: string): string {
        try {
            const imageBuffer = fs.readFileSync(imagePath);
            return imageBuffer.toString('base64');
        } catch (error) {
            console.error(`Erro ao converter imagem: ${error}`);
            return 'ERROR';
        }
    }

    public async getAllVideos(): Promise<Video[] | null> {
        const result = await this.collection.find().toArray();
        if (result && result.length > 0) {
            const videos = result.map(item=>{
                const rightPath = path.resolve(__dirname, '../../midia/photos/thumbs')
                const thumbPath = rightPath +"/"+ item.video.thumb;
                const convert64 = this.encodeImageToBase64(thumbPath);

                return{
                    ...item.video,
                    thumb:convert64
                }
            })
            return videos.map(video => new Video(
                video.id,
                video.userid,
                video.thumb,
                video.title,
                video.description,
                video.tags,
                video.video_data
            ));
        } else {
            return null;
        }
    }

    public async getVideo(ids: string[]): Promise<Video[] | null>{
        const result = await this.collection.find(
            { "video.id": { $in: ids } },
            { projection: { _id: 0 } }
        ).toArray();
        if (result && result.length > 0) {
            const videos = result.map(item=>{
                const rightPath = path.resolve(__dirname, '../../midia/photos/thumbs')
                const thumbPath = rightPath +"/"+ item.video.thumb;
                const convert64 = this.encodeImageToBase64(thumbPath);

                return{
                    ...item.video,
                    thumb:convert64
                }
            })
            return videos.map(video => new Video(
                video.id,
                video.userid,
                video.thumb,
                video.title,
                video.description,
                video.tags,
                video.video_data
            ));
        } else {
            return null;
        }
    }
}
import express, {Request, Response} from 'express';
import cors from 'cors';
import * as path from 'path';
import userRouter from './routes/userRouter';
import Database from './database';
import videoRouter from './routes/videoRouter';

export default class App{
    private app: express.Application;
    private database: Database;
    private user_route: userRouter | null = null;
    private video_route: videoRouter | null = null;

    
    constructor() {
        this.app = express();
        this.database = new Database('mongodb://127.0.0.1/motivision');
        this.config();
    }    

    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use('/thumbs', express.static(path.join(__dirname, 'midia', 'photos', 'thumbs')));
        this.app.use('/userphotos', express.static(path.join(__dirname, 'midia', 'photos', 'users')));
        this.app.use('/videos', express.static(path.join(__dirname, 'midia', 'videos')));
    }

    private routes(): void{
        if(this.user_route){
            this.app.use('/user', this.user_route.getRouter());
        }else{
            console.error("Error to connect to User Routes")
        }
        
        if(this.video_route){
            this.app.use('/video', this.video_route.getRouter());
        }else{
            console.error("Error to connect to Video Routes")
        }

        // this.app.use('/*', (req: Request, res:Response)=>{
        //     res.send({
        //         mensagem:"Ola mundo!"
        //     });
        // })
    }


    public async start(port:number | string): Promise<void>{
        try{
            await this.database.Connection();
            this.user_route = new userRouter(this.database);
            this.video_route = new videoRouter(this.database);
            this.routes();
            this.app.listen(port, ()=>{
                console.log(`Servidor rodando em ${port}`);
            })
        }catch(err){
            console.error("Error:", err);
        }
        
    }

    public async stop(): Promise<void>{
        try{
            await this.database.disconnect();
        }catch(err){
            console.error("Erro:", err);
        }
    }

    public getDatabase():Database{
        return this.database;
    }

}
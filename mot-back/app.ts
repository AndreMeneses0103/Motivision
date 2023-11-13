import express, {Request, Response} from 'express';
import testeRouter from './routes/testeRouter';
import Database from './database';

export default class App{
    private app: express.Application;
    private database: Database;
    private route: testeRouter;

    
    constructor() {
        this.app = express();
        this.database = new Database('mongodb://127.0.0.1/motivision');
        this.route = new testeRouter();
        this.config();
        this.routes();
    }    

    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes(): void{
        this.app.use('/a', this.route.getRouter());

        // this.app.use('/*', (req: Request, res:Response)=>{
        //     res.send({
        //         mensagem:"Ola mundo!"
        //     });
        // })
    }


    public async start(port:number | string): Promise<void>{
        try{
            await this.database.Connection();
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

}
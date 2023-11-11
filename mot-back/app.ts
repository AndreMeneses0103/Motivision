import express, {Request, Response} from 'express';
import testeRouter from './routes/testeRouter';

export default class App{
    private app: express.Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }    

    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes(): void{
        this.app.use('/teste', testeRouter);

        this.app.use('/*', (req: Request, res:Response)=>{
            res.send({
                mensagem:"Ola mundo!"
            });
        })
    }

    public start(port:number | string): void{
        this.app.listen(port, ()=>{
            console.log(`Servidor rodando em ${port}`);
        })
    }

}
import express, { Router } from "express";
import TesteDAO from "../models/DAO/Teste";

export default class testeRouter {
    private route: Router;
    private client: TesteDAO;
    constructor() {
        this.route = express.Router();
        this.configRouter();
    }
    private configRouter(): void {
        this.route.get("/hello", );
    }

    public getRouter(): Router{
        return this.route;
    }
}
// const rota = new testeRouter();
// export default rota.getRouter();
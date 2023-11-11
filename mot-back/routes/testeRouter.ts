import express, { Router } from "express";

class testeRouter {
    private route: Router;

    constructor() {
        this.route = express.Router();
        this.configRouter();
    }
    private configRouter(): void {
        this.route.get("/:id", () => {
            return "Hi";
        });
    }

    public getRouter(): Router{
        return this.route;
    }
}
const rota = new testeRouter();
export default rota.getRouter();
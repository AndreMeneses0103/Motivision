import express, { Router, Request, Response } from "express";
import VideoDAO from "../models/DAO/VideoDAO";
import Database from "../database";
import authToken from "../middlewares/authToken";
import createKey from "../middlewares/createKey";

export default class videoRouter {
    private route: Router;
    private data: VideoDAO;

    constructor(database: Database) {
        this.route = express.Router();
        this.data = new VideoDAO(database);
        this.configRouter();
    }

    private configRouter(): void {
        this.route.get("/all", async (req: Request, res: Response) => {
            const allTokens = req.headers.authorization;
            if (allTokens) {
                const [accessToken, refreshToken] = allTokens
                    .split(",")
                    .map((token) => token.trim());
                const generator = new createKey();
                const accessKey = generator.generateAccessKey();
                const refreshKey = generator.generateRefreshKey();
                const autorizer = new authToken();
                const verify = await autorizer.validate(
                    accessToken,
                    refreshToken,
                    accessKey,
                    refreshKey
                );

                if (verify !== undefined) {
                    if (verify.auth) {
                        const users = await this.data.getAllVideos();
                        res.json(users);
                    } else {
                        return res
                            .status(401)
                            .json({ auth: false, message: verify.message });
                    }
                }
            } else {
                return res
                    .status(401)
                    .json({ auth: false, message: "Tokens not found" });
            }
        });
    }

    public getRouter(): Router {
        return this.route;
    }
}

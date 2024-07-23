import express, { Express, NextFunction, Request, Response } from "express";
import AppLogger from "./utils/log/appLogger";
import { RouteReturn } from "./types/routes";
import { ErrorResponse } from "./utils/error";
import RouteLogger from "./utils/log/routeLogger";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

type ErrorRequestHandler = (
    err: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
) => void;

interface ITrackerApp {
    port: number;
    corsOpts?: CorsOptions;
    loggerEnabled?: boolean;
}

type DatabaseConnectionFunction = () => void;

class TrackerApp {
    private app: Express;
    private port: number;
    private appLogger: AppLogger;

    constructor({ port, corsOpts, loggerEnabled = false }: ITrackerApp) {
        this.app = express();
        this.app.use(express.json());
        this.port = port;
        this.appLogger = new AppLogger(this.port);

        if (corsOpts) {
            this.app.use(cors(corsOpts));
        }
        this.app.use(cookieParser());
        this.app.use(express.json());
        if (loggerEnabled)
            this.app.use((req, res, next) => {
                this.appLogger.request(req);
                next();
            });
    }

    private handleErrorRequest: ErrorRequestHandler = (err, req, res, next) => {
        if (err) {
            let logMessage: string;
            const { status, message, timeIssued } = err;

            if (typeof message !== "string")
                logMessage = JSON.stringify(message);
            else logMessage = message;

            console.log(`[${timeIssued}] -- ${status} -- ${logMessage}`);
            return res.status(status).send({ message, timeIssued });
        }

        next();
    };

    addDatabaseConnection(databaseFn: DatabaseConnectionFunction) {
        if (databaseFn) databaseFn();
        else console.log("Database connection cannot be established...");
        return this;
    }

    addErrorHandler() {
        this.app.use(this.handleErrorRequest);
        return this;
    }

    addRoute(route?: RouteReturn) {
        if (!route) return this;

        const routeLogger = new RouteLogger(route.routes);
        routeLogger.routeName();
        routeLogger.routesPath();
        this.app.use(route.router);
        return this;
    }

    execute() {
        this.app.listen(this.port, () => {
            this.appLogger.listener(`http://localhost:${this.port}`);
        });
    }
}

export default TrackerApp;

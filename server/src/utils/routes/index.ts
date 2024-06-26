import AuthenticationMiddleware from "../../middlewares/AuthenticationMiddleware";
import PaginationMiddleware from "../../middlewares/PaginationMiddleware";
import {
    CreateRoutes,
    GetRouter,
    GetRoutes,
    Route,
    RouterDetails,
    RouterMethods,
    RouterOptions,
} from "../../types/routes";
import express, { Router as ExpressRouter } from "express";

const routerOptions: RouterOptions = {
    isAuthenticated: false,
    middlewares: [],
};
class Router implements RouterMethods {
    private routes: Route[] = [];
    private router: ExpressRouter;
    private basePath: string;
    private authenticationMiddleware: AuthenticationMiddleware;

    constructor(basePath = "/", private options = routerOptions) {
        this.router = express.Router();
        this.basePath = basePath;
        this.authenticationMiddleware = new AuthenticationMiddleware();
    }

    createRoutes: CreateRoutes = (
        method = "get",
        path,
        action,
        middlewares = [],
        options
    ) => {
        const fullPath = `${this.basePath}${path}`;
        const route = {
            fullPath,
            method: method.toUpperCase(),
        };
        this.routes.push(route);

        if (!options) options = this.options;
        else options = { ...this.options, ...options }

        if (options) {
            if (options.isAuthenticated)
                middlewares.push(this.authenticationMiddleware.authenticate);
        }

        if (options.middlewares?.length! > 0)
            middlewares = [...middlewares, ...options.middlewares!];

        return this.router[method](fullPath, middlewares, action);
    };

    routerDetails: RouterDetails = () => {
        return {
            router: this.getRouter(),
            routes: this.getRoutes(),
        };
    };

    private getRouter: GetRouter = () => {
        return this.router;
    };

    private getRoutes: GetRoutes = () => {
        const routeName = this.basePath.slice(1).toUpperCase();
        const routes = this.routes;
        return [routeName, routes];
    };
}

export default Router;

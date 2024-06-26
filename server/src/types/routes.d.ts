import {
    IRouterMatcher,
    Router,
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from "express";
import { RequestControllerMethod } from "./request";

export interface RouteReturn {
    router: IRouter;
    routes: IRoutes;
}

export interface Route {
    fullPath: string;
    method: string;
}

export interface CreateRouteOptions extends RouterOptions { }

export interface RouterOptions {
    isAuthenticated?: boolean;
    middlewares?: RequestHandler[];
}

export type IRouter = Router;

export type IRoutes = [string, Route[]];

export type RouteMethod = "get" | "post" | "put" | "delete";

export type CreateRoutes = (
    method: RouteMethod,
    path: string,
    action: RequestHandler,
    middlewares: RequestHandler[],
    options?: CreateRouteOptions
) => IRouterMatcher<Router, method>;

export type GetRouter = () => IRouter;

export type GetRoutes = () => IRoutes;

export type RouterDetails = () => { router: IRouter; routes: IRoutes };
export class RouterMethods {
    createRoutes: CreateRoutes;
    routerDetails: RouterDetails;
}

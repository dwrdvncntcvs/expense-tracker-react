import { RequestHandler } from "express";
import ErrorService from "../utils/error";

type CommonServiceMethods = {
    getDataByUserId: (userId: string) => Promise<any>;
};

class BaseMiddleware<T extends CommonServiceMethods> {
    constructor(protected service: T) { }

    canAccess: RequestHandler = async (req, res, next) => {
        const user = req.user;

        const foundData = await this.service.getDataByUserId(user.id);

        if (!foundData) return next(ErrorService.FORBIDDEN("Access Denied!"));

        next();
    };
}

export default BaseMiddleware;

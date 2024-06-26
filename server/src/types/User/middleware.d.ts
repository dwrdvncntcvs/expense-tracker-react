import { RequestHandler } from "express";

export class IUserMiddleware {
    checkEmailExistence: RequestHandler = (req, res, next) => {};
    validatePassword: RequestHandler = (req, res, next) => {};
    checkAccountExistence: RequestHandler = (req, res, next) => {};
}

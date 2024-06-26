import { Request, RequestHandler } from "express";

export class IUserController {
    signUp: RequestHandler = (req, res, next) => {};
    signIn: RequestHandler = (req, res, next) => {};
    account: RequestHandler = (req, res, next) => {};
}

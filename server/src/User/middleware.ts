import UserService from "./service";
import ErrorService from "../utils/error";
import { IUserMiddleware } from "../types/User/middleware";
import { RequestHandler } from "express";
import BaseMiddleware from "../middlewares/BaseMiddleware";

class UserMiddleware
    extends BaseMiddleware<UserService>
    implements IUserMiddleware
{
    constructor(service: UserService) {
        super(service);
    }

    checkEmailExistence: RequestHandler = async (req, res, next) => {
        const { email } = req.body;
        const foundUser = await this.service.findByEmail(email);

        if (!foundUser)
            return next(
                ErrorService.BAD_REQUEST("Invalid Username or Password")
            );

        req.user = foundUser;
        next();
    };

    validatePassword: RequestHandler = async (req, res, next) => {
        const { password } = req.body;
        const user = req.user;
        const isPasswordValid = await this.service.validatePassword(
            user.password,
            password
        );

        if (!isPasswordValid)
            return next(
                ErrorService.BAD_REQUEST("Invalid Username or Password")
            );

        next();
    };

    checkAccountExistence: RequestHandler = async (req, res, next) => {
        const { email, username } = req.body;

        const foundUserByEmail = await this.service.findByEmail(email);
        const foundUserByUsername = await this.service.findByUsername(username);

        if (foundUserByEmail || foundUserByUsername)
            return next(
                ErrorService.BAD_REQUEST("Cannot use this email or username")
            );

        next();
    };
}

export default UserMiddleware;

import { RequestHandler } from "express";
import UserService from "../User/service";
import { JwtUser } from "../types/JWT/user";
import ErrorService from "../utils/error";
import JwtService from "../services/jwt";

class AuthenticationMiddleware {
    constructor(
        private service = new UserService(),
        private jwtService = new JwtService()
    ) { }

    authenticate: RequestHandler = async (req, _res, next) => {
        try {

            const cookies = req.cookies
            const accessToken = cookies['accessToken']

            if (!accessToken) {
                return next(ErrorService.UNAUTHORIZED("Sign in first"));
            }
            const data = await this.jwtService.verifyToken<JwtUser>(accessToken);

            const user = await this.service.findById(data.id);
            if (user) req.user = user;
            next();
        } catch (err) {
            let errData = err as Error
            if ((errData.message).includes('jwt expired')) {
                return next(ErrorService.UNAUTHORIZED("jwt expired"))
            }
            return next(ErrorService.UNAUTHORIZED("Sign in first"));
        }
    };
}

export default AuthenticationMiddleware;

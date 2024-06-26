import { CreateUser } from "../types/User/model";
import { IUserController } from "../types/User/controller";
import ErrorService from "../utils/error";
import UserService from "./service";
import JwtService from "../services/jwt";
import { RequestHandler } from "express";

const jwtService = new JwtService();
class UserController implements IUserController {
    constructor(private service: UserService) { }

    signUp: RequestHandler = async (req, res, next) => {
        try {
            const body = req.body;

            const data = await this.service.createUser(body as CreateUser);
            return res.status(200).send({ data });
        } catch (err) {
            next(ErrorService.BAD_REQUEST(err as any));
        }
    };

    signIn: RequestHandler = async (req, res, next) => {
        const { id, email } = req.user;
        const accessToken = jwtService.generateToken({ id, email }, '7d');
        const refreshToken = jwtService.generateToken({ id, email }, '365d')

        await this.service.saveRefreshToken(id, refreshToken)

        res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none", secure: true })
        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure: true })

        return res.send({ data: req.user as any, accessToken, refreshToken });
    };

    signOut: RequestHandler = async (req, res, next) => {
        const { id } = req.user

        await this.service.removeRefreshToken(id)
        res.clearCookie("refreshToken")
        res.clearCookie('accessToken')

        return res.send({ data: { message: "Signed out successfully" } })
    }

    account: RequestHandler = async (req, res, next) => {
        const { username } = req.params;

        const user = await this.service.findByUsername(username);

        if (!user) next(ErrorService.NOT_FOUND("User not found"));

        return res.status(200).send({ user });
    };

    isAuthenticated: RequestHandler = async (req, res, next) => {
        try {
            const user = req.user
            const { id, email } = user
            const accessToken = jwtService.generateToken({ id, email }, "7d")

            return res.status(200).send({ user, accessToken })
        } catch (err) {
            const errData = err as Error
            return ErrorService.BAD_REQUEST(errData.message)
        }
    }
}

export default UserController;

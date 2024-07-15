import { CreateUser } from "../types/User/model";
import { IUserController } from "../types/User/controller";
import ErrorService from "../utils/error";
import UserService from "./service";
import JwtService from "../services/jwt";
import { RequestHandler } from "express";
import FirebaseStorage from "../services/firebaseStorage";

const jwtService = new JwtService();
class UserController implements IUserController {
    firebaseStorage: FirebaseStorage = new FirebaseStorage("user/images");

    constructor(private service: UserService) {}

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
        const accessToken = jwtService.generateToken({ id, email }, "7d");
        const refreshToken = jwtService.generateToken({ id, email }, "365d");

        await this.service.saveRefreshToken(id, refreshToken);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
        });

        return res.send({ user: req.user as any, accessToken, refreshToken });
    };

    signOut: RequestHandler = async (req, res, next) => {
        const { id } = req.user;

        await this.service.removeRefreshToken(id);
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");

        return res.send({ data: { message: "Signed out successfully" } });
    };

    account: RequestHandler = async (req, res, next) => {
        const { username } = req.params;

        const user = await this.service.findByUsername(username);

        if (!user) next(ErrorService.NOT_FOUND("User not found"));

        return res.status(200).send({ user });
    };

    isAuthenticated: RequestHandler = async (req, res, next) => {
        try {
            const user = req.user;
            const { id, email } = user;
            const accessToken = jwtService.generateToken({ id, email }, "7d");

            return res.status(200).send({ user, accessToken });
        } catch (err) {
            const errData = err as Error;
            return ErrorService.BAD_REQUEST(errData.message);
        }
    };

    updateUser: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        const { first_name, last_name, username, email } = req.body;

        try {
            const data = await this.service.updateUser(id, {
                first_name,
                last_name,
                username,
                email,
            });

            return res.status(200).send({ data });
        } catch (err) {
            const errData = err as Error;
            next(ErrorService.BAD_REQUEST(errData.message));
        }
    };

    updatePassword: RequestHandler = async (req, res, next) => {
        const { id } = req.user;
        const { password, newPassword } = req.body;

        try {
            const data = await this.service.updateUserPassword(
                id,
                newPassword,
                password
            );

            return res.status(200).send({ data: data });
        } catch (err) {
            const errData = err as Error;
            next(ErrorService.BAD_REQUEST(errData.message));
        }
    };

    uploadUserProfileImage: RequestHandler = async (req, res, next) => {
        const { id } = req.user;
        const file = req.file;

        try {
            const imageUrl = await this.firebaseStorage.uploadSingleFile(file);

            const data = await this.service.updateUserProfileImage(
                id,
                imageUrl
            );

            return res.status(200).send({ data });
        } catch (err) {
            return next(ErrorService.BAD_REQUEST(err as string));
        }
    };

    deactivateUser: RequestHandler = async (req, res, next) => {
        const { id } = req.user;

        try {
            const data = await this.service.deleteUser(id);

            return res.status(200).send({ data });
        } catch (err) {
            next(ErrorService.BAD_REQUEST(err as any));
        }
    };
}

export default UserController;

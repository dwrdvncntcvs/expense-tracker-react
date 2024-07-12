import UserModel, { encryptPassword } from "./model";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../variables";
import { handleValidationError } from "../utils/error/mongo";
import { Error } from "mongoose";
import { CreateUser, UpdateUser, User } from "../types/User/model";
import { formatData } from "../database/mongoDb";

class UserService {
    private model: typeof UserModel;

    constructor() {
        this.model = UserModel;
    }

    createUser = async (userData: CreateUser) => {
        try {
            const createdData = await this.model.create(userData);
            return formatData(createdData);
        } catch (err) {
            throw handleValidationError(err as Error.ValidationError);
        }
    };

    async findById(id: string) {
        const data = await this.model.findById(id);
        return formatData(data);
    }

    async findByEmail(email: string) {
        const data = await this.model.findOne({ email });
        return formatData(data);
    }

    async validatePassword(userId: string, userPassword: string) {
        const data = await this.model.findOne({ _id: userId });
        if (data?.password) {
            return await compare(userPassword, data.password);
        } else return false;
    }

    generateAccessToken(userData: User) {
        const { id, email } = userData;
        return jwt.sign({ id, email }, SECRET_KEY, { expiresIn: "7d" });
    }

    async findByUsername(username: string) {
        const data = await this.model.findOne({ username });
        return formatData(data);
    }

    async getDataByUserId(userId: string) {
        const data = await this.model.findOne({ _id: userId });
        return formatData(data);
    }

    async saveRefreshToken(userId: string, token: string) {
        await this.model.updateOne({ _id: userId }, { refreshToken: token });
    }

    async removeRefreshToken(userId: string) {
        await this.model.updateOne({ _id: userId }, { refreshToken: null });
    }

    async updateUser(id: string, user: UpdateUser) {
        const data = await this.model.findByIdAndUpdate(id, {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
        });

        return formatData(data);
    }

    async updateUserPassword(
        userId: string,
        newPassword: string,
        password: string
    ) {
        const isPasswordValid = await this.validatePassword(userId, password);

        if (!isPasswordValid) throw new Error("Invalid Password");

        const data = await this.model.findByIdAndUpdate(userId, {
            password: await encryptPassword(newPassword),
        });

        return data;
    }
}

export default UserService;

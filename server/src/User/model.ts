import { Schema, model } from "mongoose";
import { hash, genSalt } from "bcrypt";
import { required } from "../utils";
import { User } from "../types/User/model";

const UserSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, required("First Name")],
        },
        last_name: {
            type: String,
            required: [true, required("Last Name")],
        },
        email: {
            type: String,
            required: [true, required("Email")],
            unique: true,
        },
        username: {
            type: String,
            required: [true, required("Username")],
            unique: true,
        },
        password: {
            type: String,
            required: [true, required("Password")],
        },
        refreshToken: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    }
);

const encryptPassword = async (password: string) => {
    const salt = await genSalt(10, "a");
    const hashPassword = await hash(password, salt);
    return hashPassword;
};

UserSchema.pre("save", async function (next) {
    if (this.password) this.password = await encryptPassword(this.password);
    return next();
});

export default model<User>("User", UserSchema);

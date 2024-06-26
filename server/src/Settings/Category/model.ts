import { Schema, model } from "mongoose";
import { Category } from "../../types/Settings/Category/category";
import { required } from "../../utils";

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, required("User ID")],
        },
    },
    { timestamps: true }
);

export default model<Category>("Category", CategorySchema);

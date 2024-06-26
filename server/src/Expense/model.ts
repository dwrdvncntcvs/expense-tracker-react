import { Schema, model } from "mongoose";
import { required } from "../utils";
import { Expense } from "../types/Expense/model";
import { MONTHS } from "../variables";

const ExpenseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, required("User")],
            ref: "User"
        },
        description: {
            type: String,
            required: false
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: [true, required("Category")],
            ref: "Category"
        },
        amount: {
            type: Number,
            required: [true, required("Amount")],
        },
        label: {
            type: String,
            required: [true, required("Label")],
        },
        purchaseDate: {
            type: Date,
            required: [true, required("Date of Purchase")]
        },
        month: {
            type: Number,
            enum: MONTHS,
            required: [true, required("Month")],
        },
    },
    {
        timestamps: true,
    }
);

export default model<Expense>("Expense", ExpenseSchema);

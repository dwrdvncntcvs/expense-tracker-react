import mongoose, { Schema, model } from "mongoose";
import { required } from "../utils";
import { Expense, ExpenseType } from "../types/Expense/model";
import { MONTHS } from "../variables";

export const expenseTypeEnum: ExpenseType[] = ["incoming", "outgoing"];

const ExpenseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, required("User")],
            ref: "User",
        },
        description: {
            type: String,
            required: false,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: [true, required("Category")],
            ref: "Category",
        },
        type: {
            type: String,
            enum: expenseTypeEnum,
            required: [true, required("Expense Type")],
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
            required: [true, required("Date of Purchase")],
        },
        month: {
            type: Number,
            enum: MONTHS,
            required: [true, required("Month")],
        },
        imageUrl: {
            type: String,
        },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    },
    {
        timestamps: true,
    }
);

export default model<Expense>("Expense", ExpenseSchema);

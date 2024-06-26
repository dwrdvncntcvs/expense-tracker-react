import { RequestHandler } from "express";
import { IExpenseController } from "../types/Expense/controller";
import { CreateExpense, UpdateExpense } from "../types/Expense/model";
import ErrorService from "../utils/error";
import ExpenseService from "./service";

class ExpenseController implements IExpenseController {
    constructor(private service: ExpenseService) { }

    expenses: RequestHandler = async (req, res, next) => {
        const { id: userId } = req.user;
        const { month, year } = req.params;
        req.query.page = req?.query?.page || "1"
        req.query.limit = req?.query?.limit || "10"

        try {
            const data = await this.service.getExpenses(userId, +month, +year, req.query);

            return res.status(200).send({ data });
        } catch (e) {
            if ((e as any).name === "CastError") {
                next(ErrorService.BAD_REQUEST("Months parameter must be a month number"))
            }

            next(ErrorService.BAD_REQUEST(e as any));
        }
    };

    allMonths: RequestHandler = async (req, res, next) => {
        const { id: userId } = req.user;

        try {
            const months = await this.service.getAllMonths(userId);

            return res.status(200).send({ months });
        } catch (e) {
            next(ErrorService.BAD_REQUEST(e as any));
        }
    };

    addExpense: RequestHandler = async (req, res, next) => {
        const { id: userId } = req.user;
        const { categoryId, amount, label, month, purchaseDate, description } = req.body;

        const expense: CreateExpense = {
            amount,
            categoryId,
            userId,
            label,
            month,
            purchaseDate,
            description
        };

        try {
            const data = await this.service.createExpense(expense);

            return res.status(200).send({ data });
        } catch (e) {
            next(ErrorService.BAD_REQUEST(e as any));
        }
    };

    expensesType: RequestHandler = async (req, res, next) => {
        const { id } = req.user;
        const { expenseType, month } = req.params;

        const data = await this.service.getExpensesByType(
            id,
            expenseType,
            month
        );

        return res.status(200).send({ data });
    };

    putExpense: RequestHandler = async (req, res, next) => {
        const { expenseId } = req.params;
        const { amount, label } = req.body;

        const updatedBody: UpdateExpense = {
            amount,
            label,
        };

        try {
            const data = await this.service.updateExpense(
                expenseId,
                updatedBody
            );
            return res.status(200).send({ data });
        } catch (err) {
            next(ErrorService.BAD_REQUEST(err as any));
        }
    };

    deleteExpense: RequestHandler = async (req, res, next) => {
        const { expenseId } = req.params;

        await this.service.removeExpense(expenseId);

        return res
            .status(200)
            .send({ message: "Expense successfully deleted" });
    };
}

export default ExpenseController;

import { RequestHandler } from "express";
import { IExpenseController } from "../types/Expense/controller";
import { CreateExpense, UpdateExpense } from "../types/Expense/model";
import ErrorService from "../utils/error";
import ExpenseService from "./service";
import FirebaseStorage from "../services/firebaseStorage";

class ExpenseController implements IExpenseController {
    private firebaseStorage: FirebaseStorage = new FirebaseStorage(
        "expenses/images"
    );

    constructor(private service: ExpenseService) {}

    expenses: RequestHandler = async (req, res, next) => {
        const { id: userId } = req.user;
        const { month, year } = req.params;
        req.query.page = req?.query?.page || "1";
        req.query.limit = req?.query?.limit || "10";

        try {
            const data = await this.service.getExpenses(
                userId,
                +month,
                +year,
                req?.query?.categoryId as string,
                req.query
            );

            return res.status(200).send({ data });
        } catch (e) {
            if ((e as any).name === "CastError") {
                next(
                    ErrorService.BAD_REQUEST(
                        "Months parameter must be a month number"
                    )
                );
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
        const {
            categoryId,
            amount,
            label,
            month,
            purchaseDate,
            description,
            tags,
        } = req.body;
        const file = req.file;

        const expense: CreateExpense = {
            amount,
            categoryId,
            userId,
            label,
            month,
            purchaseDate,
            description,
            tags,
        };

        try {
            if (file) {
                const imageUrl = await this.firebaseStorage.uploadSingleFile(
                    file,
                    {
                        customFilename: label,
                    }
                );
                expense["imageUrl"] = imageUrl;
            }

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
        const { amount, label, description, categoryId, tags } = req.body;

        const updatedBody: UpdateExpense = {
            amount,
            label,
            description,
            categoryId,
            tags,
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

    getExpenseMonthAnalytics: RequestHandler = async (req, res, next) => {
        const user = req.user;
        const { month, year } = req.params;

        const data = await this.service.getAnalyticsByMonth(
            +month,
            +year,
            user.id
        );

        return res.status(200).send({ data });
    };

    getExpenseYearlyAnalytics: RequestHandler = async (req, res, next) => {
        const user = req.user;
        const { year } = req.params;

        const data = await this.service.getYearlyExpenseAnalytics({
            year: +year,
            userId: user.id,
        });

        return res.status(200).send({ data });
    };

    getExpenseYearlyAnalyticsPerCategories: RequestHandler = async (
        req,
        res,
        next
    ) => {
        const user = req.user;
        const { year } = req.params;

        const data = await this.service.getYearlyExpenseAnalyticsPerCategories({
            year: +year,
            userId: user.id,
        });

        return res.status(200).send({ data });
    };

    getExpense: RequestHandler = async (req, res, next) => {
        const { id } = req.params;

        const data = await this.service.getExpense(id);

        return res.status(200).send({ data });
    };
}

export default ExpenseController;

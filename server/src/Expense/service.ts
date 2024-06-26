import { Error } from "mongoose";
import { formatData } from "../database/mongoDb";
import { ExpenseMonths } from "../types/Expense/controller";
import { CreateExpense, UpdateExpense } from "../types/Expense/model";
import { Pagination } from "../types/Pagination/pagination";
import { handleValidationError } from "../utils/error/mongo";
import { monthLookUp } from "../utils/helpers/lookup";
import ExpenseModel from "./model";

class ExpenseService {
    private model: typeof ExpenseModel;

    constructor() {
        this.model = ExpenseModel;
    }

    createExpense = async (expenseData: CreateExpense) => {
        try {
            const data = await this.model.create(expenseData);
            return formatData(data);
        } catch (err) {
            throw handleValidationError(err as Error.ValidationError);
        }
    };

    getAllMonths = async (userId: string) => {
        const data = await this.model.find({ userId });
        const formattedData = data.map((expense) => formatData(expense));

        const mappedData = formattedData.map((val) => ({
            year: val?.purchaseDate.getFullYear(),
            month: val?.month
        }))

        const reducedData = mappedData.reduce<ExpenseMonths>((acc, curr) => {
            if (!(curr?.year && curr?.month)) {
                return acc
            }

            const year = curr.year
            const month = curr.month

            if (year in acc) {
                if (!acc[year].includes(month))
                    acc[year] = [...acc[year], month]
                return acc
            }

            acc[year] = []
            acc[year].push(month)


            return acc
        }, {})

        return Object.keys(reducedData).reduce<{ [key: string]: string[] }>((acc, curr) => {
            console.log("Reduced Data: ", reducedData[curr])
            acc[curr] = reducedData[curr].sort((a, b) => a - b).map(val => monthLookUp(val).toLowerCase())
            return { ...acc }
        }, {})
    };

    getExpenses = async (userId: string, month: number, year: number, pagination?: Pagination) => {
        const filters = {
            userId: userId,
            month: month,
            purchaseDate: {
                $gte: new Date(year, 0, 1), // Start of the year
                $lt: new Date(year + 1, 0, 1) // Start of the next year
            }
        };

        console.log("Pagination ", pagination?.limit! * pagination?.page!)

        if (pagination?.page && pagination?.limit) {
            pagination.page = +pagination.page
            pagination.limit = +pagination.limit
            pagination.offset = (pagination.page - 1) * pagination.limit
        }

        let data = await this.model.aggregate([
            { $match: filters },

            {
                "$facet": {
                    "metadata": [
                        { "$count": "total" },
                        {
                            "$addFields": {
                                "page": pagination?.page || 1,
                            }
                        },

                    ],

                    "totalAmount": [
                        {
                            "$group": {
                                "_id": null,
                                "totalAmount": { "$sum": "$amount" }
                            }
                        }
                    ],

                    "data": [
                        { $skip: pagination?.offset || 0 },
                        { $limit: pagination?.limit || 10 },
                        {
                            "$group": {
                                "_id": null,
                                "expenses": { "$push": "$$ROOT" }
                            }
                        },
                        {
                            "$project": {
                                "_id": 0,
                                "totalAmount": 1,
                                "expenses": {
                                    "$map": {
                                        "input": "$expenses",
                                        "as": "expense",
                                        "in": {
                                            "id": "$$expense._id",
                                            "userId": "$$expense.userId",
                                            "label": "$$expense.label",
                                            "categoryId": "$$expense.categoryId",
                                            "amount": "$$expense.amount",
                                            "purchaseDate": "$$expense.purchaseDate",
                                            "month": "$$expense.month",
                                            "createdAt": "$$expense.createdAt",
                                            "updatedAt": "$$expense.updatedAt" // Fixed field name
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },

            },
            {
                "$project": {
                    "metadata": { "$arrayElemAt": ["$metadata", 0] },
                    "totalAmount": { "$arrayElemAt": ["$totalAmount.totalAmount", 0] },
                    "data": { "$arrayElemAt": ["$data.expenses", 0] }
                }
            },
            {
                "$addFields": {
                    "metadata.hasNext": {
                        "$cond": [
                            { "$gt": ["$metadata.total", (pagination?.limit || 10) * (pagination?.page || 1)] },
                            true,
                            false
                        ]
                    }
                }
            }
        ])

        return {
            expenses: data[0]
        };
    };

    // TODO: Fix the categories for
    getExpensesByType = async (userId: string, type: string, month: string) => {
        const data = await this.model.find({
            userId,
            expenseType: type,
            month,
        });
        return data.map((dataVal) => formatData(dataVal));
    };

    updateExpense = async (expenseId: string, data: UpdateExpense) => {
        try {
            await this.model.updateOne({ id: expenseId }, data, {
                runValidators: true,
            });

            const updatedData = await this.model.findOne({ id: expenseId });
            return formatData(updatedData);
        } catch (err) {
            throw handleValidationError(err as Error.ValidationError);
        }
    };

    removeExpense = async (expenseId: string) => {
        return await this.model.deleteOne({ id: expenseId });
    };

    getDataByUserId = async (userId: string) => {
        return await this.model.findOne({ userId });
    };
}

export default ExpenseService;

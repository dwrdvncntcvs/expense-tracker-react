import { Error, Types } from "mongoose";
import { formatData } from "../database/mongoDb";
import { ExpenseMonths } from "../types/Expense/controller";
import {
    CreateExpense,
    ExpenseType,
    UpdateExpense,
} from "../types/Expense/model";
import { Pagination } from "../types/Pagination/pagination";
import { handleValidationError } from "../utils/error/mongo";
import { monthLookUp } from "../utils/helpers/lookup";
import { MONTHS_OBJ } from "../variables";
import ExpenseModel from "./model";
import {
    GenerateCategoryAggregate,
    GenerateExpenseAggregate,
} from "../aggregates";

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

    getExpense = async (expenseId: string) => {
        const data = await this.model.findById(expenseId).populate("Tags");
        return formatData(data);
    };

    getAnalyticsByMonth = async (
        month: number,
        year: number,
        userId: string
    ) => {
        const { categoryData, categoryTotal } = new GenerateCategoryAggregate(
            userId,
            month,
            year
        );

        const incomingCategoryData = await this.model.aggregate(
            categoryData("incoming")
        );

        const outgoingCategoryData = await this.model.aggregate(
            categoryData("outgoing")
        );

        const outgoingTotal = await this.model.aggregate(
            categoryTotal("outgoing")
        );
        const incomingTotal = await this.model.aggregate(
            categoryTotal("incoming")
        );

        const percentageMapping = (totalObject: any) => (category: any) => {
            return {
                ...category,
                percentage: totalObject.totalAmount
                    ? Math.round(
                          (category.totalAmount / totalObject.totalAmount) *
                              10000
                      ) / 100
                    : 0,
            };
        };

        const incomingCategoryDataWithPercentage = incomingCategoryData.map(
            percentageMapping(incomingTotal[0])
        );

        const outgoingCategoryDataWithPercentage = outgoingCategoryData.map(
            percentageMapping(outgoingTotal[0])
        );

        return {
            meta: {
                incoming: incomingTotal[0],
                outgoing: outgoingTotal[0],
            },
            data: {
                incoming: incomingCategoryDataWithPercentage,
                outgoing: outgoingCategoryDataWithPercentage,
            },
        };
    };

    getAllMonths = async (userId: string) => {
        const data = await this.model.find({ userId });
        const formattedData = data.map((expense) => formatData(expense));

        const mappedData = formattedData.map((val) => ({
            year: val?.purchaseDate.getFullYear(),
            month: val?.month,
        }));

        const reducedData = mappedData.reduce<ExpenseMonths>((acc, curr) => {
            if (!(curr?.year && curr?.month)) {
                return acc;
            }

            const year = curr.year;
            const month = curr.month;

            if (year in acc) {
                if (!acc[year].includes(month))
                    acc[year] = [...acc[year], month];
                return acc;
            }

            acc[year] = [];
            acc[year].push(month);

            return acc;
        }, {});

        return Object.keys(reducedData).reduce<{ [key: string]: string[] }>(
            (acc, curr) => {
                acc[curr] = reducedData[curr]
                    .sort((a, b) => a - b)
                    .map((val) => monthLookUp(val).toLowerCase());
                return { ...acc };
            },
            {}
        );
    };

    getExpenses = async (
        userId: string,
        month: number,
        year: number,
        categoryId?: string,
        pagination?: Pagination,
        expenseType: ExpenseType | undefined = undefined
    ) => {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

        const expenseAggregate = new GenerateExpenseAggregate(
            userId,
            startDate,
            endDate
        );

        let data = await this.model.aggregate(
            expenseAggregate.expenses(
                month,
                categoryId,
                expenseType,
                pagination
            )
        );

        return {
            expenses: data[0],
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
            const updatedData = await this.model.findOneAndUpdate(
                { _id: expenseId },
                data,
                {
                    runValidators: true,
                }
            );

            return formatData(updatedData);
        } catch (err) {
            throw handleValidationError(err as Error.ValidationError);
        }
    };

    removeExpense = async (expenseId: string) => {
        return await this.model.deleteOne({ _id: expenseId });
    };

    getDataByUserId = async (userId: string) => {
        return await this.model.findOne({ userId });
    };

    getYearlyExpenseAnalyticsPerCategories = async ({
        year,
        userId,
    }: {
        year: number;
        userId: string;
    }) => {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

        const { expensesReportPerCategories } = new GenerateExpenseAggregate(
            userId,
            startDate,
            endDate
        );

        const data = await this.model.aggregate(expensesReportPerCategories());

        const totalAmount = data[0].totalAmount[0].totalAmount;
        const analyticsData = data[0].monthlyExpensesPerCategory;

        return {
            meta: {
                totalAmount,
            },
            data: analyticsData,
        };
    };

    getYearlyExpenseAnalytics = async ({
        year,
        userId,
    }: {
        year: number;
        userId: string;
    }) => {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

        const { expenseYearlyAnalytics } = new GenerateExpenseAggregate(
            userId,
            startDate,
            endDate
        );

        const data = await this.model.aggregate(expenseYearlyAnalytics(year));

        const totalYearlyObject = data[0].totalAmount[0];
        const monthlyTotalExpenseArr = data[0].monthlyTotalExpenses;
        const monthlyExpensesPerCategory = data[0].monthlyExpensesPerCategory;

        const monthlyTotalExpensesWithPercentage = monthlyTotalExpenseArr.map(
            (val: { id: number; totalAmount: number; label: string }) => ({
                ...val,
                percentage:
                    Math.round(
                        (val.totalAmount / totalYearlyObject.totalAmount) *
                            10000
                    ) / 100,
            })
        ) as {
            id: number;
            totalAmount: number;
            name: string;
            percentage: number;
        }[];

        return {
            meta: totalYearlyObject,
            data: monthlyTotalExpensesWithPercentage.sort(
                (a, b) => a.id - b.id
            ),
        };
    };
}

export default ExpenseService;

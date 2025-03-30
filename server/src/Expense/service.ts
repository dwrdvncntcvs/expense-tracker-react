import { Error } from "mongoose";
import {
    GenerateCategoryAggregate,
    GenerateExpenseAggregate,
} from "../aggregates";
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

    getExpense = async (expenseId: string) => {
        const data = await this.model.findById(expenseId).populate("Tags");
        return formatData(data);
    };

    getAnalyticsByMonth = async (
        month: number,
        year: number,
        userId: string,
        expenseType: ExpenseType = "incoming"
    ) => {
        const { categoryData, categoryTotal } = new GenerateCategoryAggregate(
            userId,
            month,
            year
        );

        const aggregatedCategoryData = await this.model.aggregate(
            categoryData(expenseType)
        );

        const aggregatedCategoryDataTotal = await this.model.aggregate(
            categoryTotal(expenseType)
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

        const categoryDataWithPercentage = aggregatedCategoryData.map(
            percentageMapping(aggregatedCategoryDataTotal[0])
        );

        return {
            meta: aggregatedCategoryDataTotal[0],
            data: categoryDataWithPercentage,
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
        expenseType,
    }: {
        year: number;
        userId: string;
        expenseType: ExpenseType;
    }) => {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

        const { expensesReportPerCategories } = new GenerateExpenseAggregate(
            userId,
            startDate,
            endDate
        );

        const data = await this.model.aggregate(
            expensesReportPerCategories(expenseType)
        );

        const totalAmount = data[0].totalAmount[0]?.totalAmount || 0;
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
        expenseType,
    }: {
        year: number;
        userId: string;
        expenseType: ExpenseType;
    }) => {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

        const { expenseYearlyAnalytics } = new GenerateExpenseAggregate(
            userId,
            startDate,
            endDate
        );

        const data = await this.model.aggregate(
            expenseYearlyAnalytics(year, expenseType)
        );

        const totalYearlyAmount = data[0].totalAmount[0]?.totalAmount || 0;
        const monthlyExpenses = data[0].monthlyTotalExpenses;

        const monthlyExpensesWithPercentage = monthlyExpenses.map(
            (expense: { id: number; totalAmount: number; label: string }) => ({
                id: expense.id,
                totalAmount: expense.totalAmount,
                name: expense.label,
                percentage: totalYearlyAmount
                    ? Math.round(
                          (expense.totalAmount / totalYearlyAmount) * 10000
                      ) / 100
                    : 0,
            })
        );

        return {
            meta: { totalAmount: totalYearlyAmount },
            data: monthlyExpensesWithPercentage.sort(
                (a: { id: number }, b: { id: number }) => a.id - b.id
            ),
        };
    };
}

export default ExpenseService;

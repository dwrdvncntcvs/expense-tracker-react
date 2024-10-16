import { Error } from "mongoose";
import { formatData } from "../database/mongoDb";
import { ExpenseMonths } from "../types/Expense/controller";
import { CreateExpense, UpdateExpense } from "../types/Expense/model";
import { Pagination } from "../types/Pagination/pagination";
import { handleValidationError } from "../utils/error/mongo";
import { monthLookUp } from "../utils/helpers/lookup";
import { Types } from "mongoose";
import ExpenseModel from "./model";
import { MONTHS, MONTHS_OBJ } from "../variables";

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
        const categoryData = await this.model.aggregate([
            {
                $match: {
                    userId: userId,
                    month: month,
                    purchaseDate: {
                        $gte: new Date(year, month - 1, 1), // Start of the selected month
                        $lt: new Date(year, month, 1), // Start of the next month
                    },
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryInfo",
                },
            },
            {
                $unwind: "$categoryInfo",
            },
            {
                $group: {
                    _id: "$categoryId",
                    id: { $first: "$categoryId" },
                    name: { $first: "$categoryInfo.name" },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    name: 1,
                    totalAmount: 1,
                    count: 1,
                },
            },
        ]);
        const total = await this.model.aggregate([
            {
                $match: {
                    userId: userId,
                    month: month,
                    purchaseDate: {
                        $gte: new Date(year, month - 1, 1), // Start of the selected month
                        $lt: new Date(year, month, 1), // Start of the next month
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    totalAmount: 1,
                    count: 1,
                },
            },
        ]);

        const totalData = total[0];

        const categoryDataWithPercentage = categoryData.map((category) => {
            return {
                ...category,
                percentage: totalData.totalAmount
                    ? Math.round(
                          (category.totalAmount / totalData.totalAmount) * 10000
                      ) / 100
                    : 0,
            };
        });

        return {
            expenseAnalytics: totalData,
            categoriesExpenseAnalytics: categoryDataWithPercentage,
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

    getRawExpenses = async (userId: string, filters?: { year?: number }) => {
        const data = await this.model.find({
            userId,
            // purchaseDate: filters?.year
            //     ? {
            //           $gte: new Date(filters.year, 0, 1), // Start of the filters.year
            //           $lt: new Date(filters.year + 1, 0, 1), // Start of the next year
            //       }
            //     : undefined,
        });
        return data.map((val) => formatData(val));
    };

    getExpenses = async (
        userId: string,
        month: number,
        year: number,
        categoryId?: string,
        pagination?: Pagination
    ) => {
        const filters: any = {
            userId: userId, // Convert userId to ObjectId
            month: month,
            purchaseDate: {
                $gte: new Date(year, 0, 1), // Start of the year
                $lt: new Date(year + 1, 0, 1), // Start of the next year
            },
        };

        if (typeof categoryId !== "undefined") {
            filters["categoryId"] = new Types.ObjectId(categoryId);
        }

        if (pagination?.page && pagination?.limit) {
            pagination.page = +pagination.page;
            pagination.limit = +pagination.limit;
            pagination.offset = (pagination.page - 1) * pagination.limit;
        }

        let data = await this.model.aggregate([
            { $match: filters },

            {
                $facet: {
                    metadata: [
                        { $count: "total" },
                        {
                            $addFields: {
                                page: pagination?.page || 1,
                            },
                        },
                    ],

                    totalAmount: [
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: "$amount" },
                            },
                        },
                    ],

                    data: [
                        { $skip: pagination?.offset || 0 },
                        { $limit: pagination?.limit || 10 },
                        {
                            $lookup: {
                                from: "categories", // Replace 'categories' with the actual name of your Category collection
                                localField: "categoryId",
                                foreignField: "_id",
                                as: "category",
                            },
                        },
                        {
                            $unwind: {
                                path: "$category",
                                preserveNullAndEmptyArrays: true, // This keeps the expense even if it has no category
                            },
                        },
                        {
                            $lookup: {
                                from: "tags", // The 'tags' collection to join
                                localField: "tags", // The field in 'expenses' referencing the tags (an array of tag IDs)
                                foreignField: "_id", // The field in 'tags' that matches 'tagIds'
                                as: "matchedTags", // The output field where the tags data will be stored
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                expenses: { $push: "$$ROOT" },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                totalAmount: 1,
                                expenses: {
                                    $map: {
                                        input: "$expenses",
                                        as: "expense",
                                        in: {
                                            id: "$$expense._id",
                                            userId: "$$expense.userId",
                                            label: "$$expense.label",
                                            description:
                                                "$$expense.description",
                                            categoryId: "$$expense.categoryId",
                                            category: {
                                                id: "$$expense.category._id",
                                                name: "$$expense.category.name",
                                            },
                                            tags: "$$expense.tags",
                                            tagList: {
                                                $map: {
                                                    input: "$$expense.matchedTags", // Directly map matched tags
                                                    as: "tag",
                                                    in: {
                                                        id: "$$tag._id", // Get the _id of each tag
                                                        name: "$$tag.name", // Get the name of each tag
                                                    },
                                                },
                                            },
                                            amount: "$$expense.amount",
                                            imageUrl: "$$expense.imageUrl",
                                            purchaseDate:
                                                "$$expense.purchaseDate",
                                            month: "$$expense.month",
                                            createdAt: "$$expense.createdAt",
                                            updatedAt: "$$expense.updatedAt", // Fixed field name
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    metadata: { $arrayElemAt: ["$metadata", 0] },
                    totalAmount: {
                        $arrayElemAt: ["$totalAmount.totalAmount", 0],
                    },
                    data: { $arrayElemAt: ["$data.expenses", 0] },
                },
            },
            {
                $addFields: {
                    "metadata.hasPrev": {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $lt: [
                                            "$metadata.total",
                                            (pagination?.limit || 10) *
                                                (pagination?.page || 1),
                                        ],
                                    },
                                    { $gt: ["$metadata.page", 1] },
                                ],
                            },
                            true,
                            false,
                        ],
                    },
                    "metadata.hasNext": {
                        $cond: [
                            {
                                $gt: [
                                    "$metadata.total",
                                    (pagination?.limit || 10) *
                                        (pagination?.page || 1),
                                ],
                            },
                            true,
                            false,
                        ],
                    },
                },
            },
        ]);

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

        const mappedSwitchCaseMonth = Object.keys(MONTHS_OBJ).map((key) => {
            const label = key.toLowerCase();
            const monthValue = MONTHS_OBJ[key as keyof typeof MONTHS_OBJ];
            return {
                case: { $eq: ["$id", +monthValue] },
                then: `${label.charAt(0).toUpperCase()}${label.slice(1)}`,
            };
        });

        const data = await this.model.aggregate([
            {
                $match: {
                    userId: userId,
                    purchaseDate: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $facet: {
                    totalAmount: [
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: "$amount" },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                totalAmount: 1,
                            },
                        },
                    ],
                    monthlyExpensesPerCategory: [
                        {
                            $lookup: {
                                from: "categories",
                                localField: "categoryId",
                                foreignField: "_id",
                                as: "category",
                            },
                        },
                        {
                            $unwind: {
                                path: "$category",
                                includeArrayIndex: "string",
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        {
                            $group: {
                                _id: {
                                    categoryId: "$categoryId",
                                    month: "$month",
                                },
                                totalAmount: { $sum: "$amount" },
                                monthName: { $first: "$month" },
                                categoryName: { $first: "$category.name" },
                                count: { $sum: 1 },
                            },
                        },
                        {
                            $group: {
                                _id: "$_id.categoryId",
                                categoryName: { $first: "$categoryName" },
                                id: { $first: "$_id.categoryId" },
                                months: {
                                    $push: {
                                        month: "$_id.month",
                                        totalAmount: "$totalAmount",
                                        count: "$count",
                                    },
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                id: 1,
                                months: 1,
                                categoryName: 1,
                            },
                        },
                    ],
                },
            },
        ]);

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

        const mappedSwitchCaseMonth = Object.keys(MONTHS_OBJ).map((key) => {
            const label = key.toLowerCase();
            const monthValue = MONTHS_OBJ[key as keyof typeof MONTHS_OBJ];
            return {
                case: { $eq: ["$id", +monthValue] },
                then: `${label.charAt(0).toUpperCase()}${label.slice(1)}`,
            };
        });

        const data = await this.model.aggregate([
            {
                $match: {
                    userId: userId,
                    purchaseDate: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $facet: {
                    totalAmount: [
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: "$amount" },
                                year: { $first: year },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                totalAmount: 1,
                                year: 1,
                            },
                        },
                    ],
                    monthlyTotalExpenses: [
                        {
                            $group: {
                                _id: "$month",
                                id: { $first: "$month" },
                                label: { $first: "$month" },
                                totalAmount: { $sum: "$amount" },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                id: 1,
                                totalAmount: 1,
                                label: {
                                    $switch: {
                                        branches: mappedSwitchCaseMonth,
                                        default: "Unknown",
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ]);

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
            label: string;
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

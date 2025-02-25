import { Types } from "mongoose";
import { ExpenseType } from "../types/Expense/model";
import { Pagination } from "../types/Pagination/pagination";
import { MONTHS_OBJ } from "../variables";

export default class GenerateExpenseAggregate {
    constructor(
        private userId: string,
        private startDate: Date,
        private endDate: Date
    ) {}

    expensesReportPerCategories = () => {
        return [
            {
                $match: {
                    userId: this.userId,
                    purchaseDate: {
                        $gte: this.startDate,
                        $lt: this.endDate,
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
        ];
    };

    expenses = (
        month: number,
        categoryId?: string,
        expenseType?: ExpenseType,
        pagination?: Pagination
    ) => {
        const filters: any = {
            userId: this.userId, // Convert userId to ObjectId
            month: month,
            purchaseDate: {
                $gte: this.startDate, // Start of the year
                $lt: this.endDate, // Start of the next year
            },
        };

        if (typeof categoryId !== "undefined") {
            filters["categoryId"] = new Types.ObjectId(categoryId);
        }

        if (expenseType) {
            filters["type"] = expenseType;
        }

        if (pagination?.page && pagination?.limit) {
            pagination.page = +pagination.page;
            pagination.limit = +pagination.limit;
            pagination.offset = (pagination.page - 1) * pagination.limit;
        }

        return [
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
                    incomingTotal: [
                        {
                            $match: {
                                type: "incoming",
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: "$amount" },
                            },
                        },
                    ],
                    outgoingTotal: [
                        {
                            $match: {
                                type: "outgoing",
                            },
                        },
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
                                            type: "$$expense.type",
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
                    incomingTotal: {
                        $arrayElemAt: ["$incomingTotal.totalAmount", 0],
                    },
                    outgoingTotal: {
                        $arrayElemAt: ["$outgoingTotal.totalAmount", 0],
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
                                        $lte: [
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
                                $gte: [
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
        ];
    };

    expenseYearlyAnalytics = (year: number) => {
        const mappedSwitchCaseMonth = Object.keys(MONTHS_OBJ).map((key) => {
            const label = key.toLowerCase();
            const monthValue = MONTHS_OBJ[key as keyof typeof MONTHS_OBJ];
            return {
                case: { $eq: ["$id", +monthValue] },
                then: `${label.charAt(0).toUpperCase()}${label.slice(1)}`,
            };
        });
        return [
            {
                $match: {
                    userId: this.userId,
                    purchaseDate: {
                        $gte: this.startDate,
                        $lt: this.endDate,
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
                                name: {
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
        ];
    };
}

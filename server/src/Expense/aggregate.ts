import { type ExpenseType } from "../types/Expense/model";

export const generateCategoryDataAggregate = (
    userId: string,
    month: number,
    year: number,
    type: ExpenseType
) => {
    return [
        {
            $match: {
                userId: userId,
                month: month,
                purchaseDate: {
                    $gte: new Date(year, month - 1, 1), // Start of the selected month
                    $lt: new Date(year, month, 1), // Start of the next month
                },
                type,
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
    ];
};

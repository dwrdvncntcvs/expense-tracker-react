import { type ExpenseType } from "../types/Expense/model";

export default class GenerateCategoryAggregate {
    constructor(
        private userId: string,
        private month: number,
        private year: number
    ) {}

    categoryData = (type: ExpenseType) => {
        return [
            {
                $match: {
                    userId: this.userId,
                    month: this.month,
                    purchaseDate: {
                        $gte: new Date(this.year, this.month - 1, 1), // Start of the selected month
                        $lt: new Date(this.year, this.month, 1), // Start of the next month
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

    categoryTotal = (type: ExpenseType) => [
        {
            $match: {
                userId: this.userId,
                month: this.month,
                purchaseDate: {
                    $gte: new Date(this.year, this.month - 1, 1), // Start of the selected month
                    $lt: new Date(this.year, this.month, 1), // Start of the next month
                },
                type,
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
    ];
}

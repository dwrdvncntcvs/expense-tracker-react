import { MONTHS_OBJ } from "../variables";

export default class GenerateExpenseAggregate {
    constructor(
        private userId: string,
        private startDate: Date,
        private endDate: Date
    ) {}

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

import { ExpenseType, ICreateExpense, IExpense, ExpenseMonthDetails, ExpenseMonths } from "@_types/expense";
import api from "./api";
import { ExpenseReportByMonth, ExpenseReportByYear, ExpenseReportByCategory } from "@_types/reports";

export interface ExpenseByMonthParams {
    month: string;
    year: string;
    query?: string;
    expenseType?: ExpenseType;
}

export interface YearlyExpensesParams {
    year: number;
    expenseType?: ExpenseType;  
}

const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        getExpenses: build.query<ExpenseMonths, void>({
            query: () => ({ url: "/expenses", method: "get" }),
            providesTags: ["expense-months"],
        }),
        getExpensesByMonth: build.query<ExpenseMonthDetails, ExpenseByMonthParams>({
            query: (params) => {
                return {
                    url: `/expenses/${params.month}/${params.year}${
                        params.query ? `?${params.query}` : ""
                    }`,
                    method: "get",
                };
            },
            providesTags: ["expense-months-details"],
        }),
        createExpense: build.mutation<IExpense, ICreateExpense>({
            query: (val) => {
                return {
                    url: "/expenses",
                    method: "POST",
                    data: val,
                    headers: {
                        "Content-Type":
                            "expense-image" in val
                                ? "multipart/form-data"
                                : "application/json",
                    },
                };
            },
            invalidatesTags: [
                "expense-year-analytics",
                "expense-month-analytics",
                "expense-months",
                "expense-months-details",
                "expense-year-analytics-cat",
            ],
        }),
        updateExpense: build.mutation<IExpense, IExpense>({
            query: (val) => ({
                url: `/expenses/${val.id}`,
                method: "PUT",
                data: val,
            }),
            invalidatesTags: [
                "expense-months-details",
                "expense-month-analytics",
                "expense-year-analytics",
                "expense-year-analytics-cat",
            ],
        }),
        deleteExpense: build.mutation<void, string>({
            query: (val) => ({ url: `/expenses/${val}`, method: "DELETE" }),
            invalidatesTags: [
                "expense-months-details",
                "expense-month-analytics",
                "expense-year-analytics",
                "expense-year-analytics-cat",
            ],
        }),
        getExpensesByMonthAnalytics: build.query<
            { data: ExpenseReportByMonth },
            ExpenseByMonthParams
        >({
            query: (val) => ({
                url: `/expenses/${val.month}/${val.year}/analytics?expenseType=${val.expenseType}`,
                method: "GET",
            }),
            providesTags: ["expense-month-analytics"],
        }),
        getExpensesYearlyAnalytics: build.query<
            { data: ExpenseReportByYear },
            YearlyExpensesParams
        >({
            query: (val) => ({
                url: `/expenses/all/year/${val.year}/analytics?expenseType=${val.expenseType}`,
                method: "GET",
            }),
            providesTags: ["expense-year-analytics"],
        }),
        getExpensesYearlyAnalyticsPerCategory: build.query<
            { data: ExpenseReportByCategory },
            { year: string, expenseType: ExpenseType }
        >({
            query: (val) => ({
                url: `/expenses/per-categories/year/${val.year}/analytics?expenseType=${val.expenseType}`,
                method: "get",
            }),
            providesTags: ["expense-year-analytics-cat"],
        }),
    }),
});

export const {
    useCreateExpenseMutation,
    useGetExpensesQuery,
    useGetExpensesByMonthQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
    useGetExpensesByMonthAnalyticsQuery,
    useGetExpensesYearlyAnalyticsQuery,
    useGetExpensesYearlyAnalyticsPerCategoryQuery,
} = expenseApi;

export default expenseApi;

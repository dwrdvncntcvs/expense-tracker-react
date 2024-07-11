import { ICreateExpense, IExpense } from "@_types/expense";
import api from "./api";

export interface ExpenseByMonthParams {
    month: string;
    year: string;
    query?: string;
}

const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        getExpenses: build.query<any, void>({
            query: () => ({ url: "/expenses", method: "get" }),
            providesTags: ["expense-months"],
        }),
        getExpensesByMonth: build.query<any, ExpenseByMonthParams>({
            query: (params) => ({
                url: `/expenses/${params.month}/${params.year}${
                    params.query ? `?${params.query}` : ""
                }`,
                method: "get",
            }),
            providesTags: ["expense-months-details"],
        }),
        createExpense: build.mutation<any, ICreateExpense>({
            query: (val) => ({ url: "/expenses", method: "POST", data: val }),
            invalidatesTags: [
                "expense-months",
                "expense-months-details",
                "expense-months-details-analytics",
            ],
        }),
        updateExpense: build.mutation<any, IExpense>({
            query: (val) => ({
                url: `/expenses/${val.id}`,
                method: "PUT",
                data: val,
            }),
            invalidatesTags: [
                "expense-months-details",
                "expense-months-details-analytics",
            ],
        }),
        deleteExpense: build.mutation<any, string>({
            query: (val) => ({ url: `/expenses/${val}`, method: "DELETE" }),
            invalidatesTags: [
                "expense-months-details",
                "expense-months-details-analytics",
            ],
        }),
        getExpensesByMonthAnalytics: build.query<any, ExpenseByMonthParams>({
            query: (val) => ({
                url: `/expenses/${val.month}/${val.year}/analytics`,
                method: "GET",
            }),
            providesTags: ["expense-months-details-analytics"],
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
} = expenseApi;

export default expenseApi;

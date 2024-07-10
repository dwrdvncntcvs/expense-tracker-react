import { ICreateExpense } from "@_types/expense";
import api from "./api";

const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        getExpenses: build.query<any, void>({
            query: () => ({ url: "/expenses", method: "get" }),
            providesTags: ["expense-months"],
        }),
        createExpense: build.mutation<any, ICreateExpense>({
            query: (val) => ({ url: "/expenses", method: "POST", data: val }),
            invalidatesTags: ["expense-months"],
        }),
    }),
});

export const { useCreateExpenseMutation, useGetExpensesQuery } = expenseApi;

export default expenseApi;

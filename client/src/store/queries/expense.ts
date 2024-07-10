import { ICreateExpense } from "@_types/expense";
import api from "./api";

const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        createExpense: build.mutation<any, ICreateExpense>({
            query: (val) => ({ url: "/expenses", method: "POST", data: val }),
        }),
    }),
});

export const { useCreateExpenseMutation } = expenseApi;

export default expenseApi;

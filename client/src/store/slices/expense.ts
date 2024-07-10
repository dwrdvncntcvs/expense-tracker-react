import { IExpense } from "@_types/expense";
import { createSlice } from "@reduxjs/toolkit";

interface ExpenseState {
    expenses: IExpense[];
    loading: boolean;
    error: null | string;
}

const initialState: ExpenseState = {
    expenses: [],
    loading: false,
    error: null,
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default expenseSlice;

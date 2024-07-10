import { IExpense } from "@_types/expense";
import { createSlice } from "@reduxjs/toolkit";
import expenseApi from "@store/queries/expense";

interface ExpenseState {
    expenses: IExpense[];
}

const initialState: ExpenseState = {
    expenses: [],
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            expenseApi.endpoints.createExpense.matchFulfilled,
            (state, actions) => {
                state.expenses = [...state.expenses, actions.payload.data];
            }
        );
    },
});

export default expenseSlice;

import { IExpense, IExpenseList } from "@_types/expense";
import { createSlice } from "@reduxjs/toolkit";
import expenseApi from "@store/queries/expense";

interface ExpenseState {
    expenses: IExpenseList;
}

const initialState: ExpenseState = {
    expenses: {},
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            expenseApi.endpoints.getExpenses.matchFulfilled,
            (state, actions) => {
                state.expenses = actions.payload.months;
            }
        );
    },
});

export default expenseSlice.reducer;

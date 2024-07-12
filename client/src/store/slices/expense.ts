import { ExpenseMonthDetails, IExpenseList } from "@_types/expense";
import { useAppSelector } from "@hooks/storeHooks";
import { createSlice } from "@reduxjs/toolkit";
import expenseApi from "@store/queries/expense";

export interface ExpenseState {
    expenses: IExpenseList;
    expenseMonths: ExpenseMonthDetails;
}

const initialState: ExpenseState = {
    expenses: {},
    expenseMonths: {
        data: [],
        metadata: { hasNext: false, page: 0, total: 0 },
        totalAmount: 0,
    },
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                expenseApi.endpoints.getExpenses.matchFulfilled,
                (state, actions) => {
                    state.expenses = actions.payload.months;
                }
            )
            .addMatcher(
                expenseApi.endpoints.getExpensesByMonth.matchFulfilled,
                (state, actions) => {
                    state.expenseMonths = actions.payload.data.expenses;
                }
            );
    },
});

export const useExpense = () => useAppSelector((state) => state.expenseReducer);

export default expenseSlice.reducer;

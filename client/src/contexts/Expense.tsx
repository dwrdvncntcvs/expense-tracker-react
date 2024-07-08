import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useReducer,
} from "react";
import {
    ExpenseActions,
    ExpenseState,
    ICreateExpense,
    IExpenseContext,
} from "../types/expense";
import { useMutation } from "@tanstack/react-query";
import { expense as _expense } from "../common/api";
import { success } from "../store/slices/toast";

const ExpenseContext = createContext<IExpenseContext>({
    expenses: [],
    addExpense: () => {},
});

const reducer = (state: ExpenseState, actions: ExpenseActions) => {
    switch (actions.type) {
        case "add-expense":
            return {
                ...state,
                expenses: [...state.expenses, actions.value],
            };
        default:
            return state;
    }
};

const ExpenseProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { expenses: [] });

    const { mutateAsync } = useMutation({
        mutationKey: ["create-expense"],
        mutationFn: (expense: ICreateExpense) =>
            _expense.createExpense(expense),
    });

    const addExpense = async (expense: ICreateExpense) => {
        const data = await mutateAsync(expense);

        if (data.status < 400) {
            dispatch({ type: "add-expense", value: data });
            success({ message: "Expense added successfully" });
        }
    };

    return (
        <ExpenseContext.Provider value={{ ...state, addExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => {
    const context = useContext(ExpenseContext);

    if (!context)
        throw new Error("Cannot use 'useExpense' outside of ExpenseProvider");

    return context;
};

export default ExpenseProvider;

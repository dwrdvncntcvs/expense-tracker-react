export interface IExpense {
    id: string;
    userId: string;
    categoryId: string;
    label: string;
    purchaseDate: Date;
    month: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
    description: string;
}

export type OmitExpenseMeta = "id" | "createdAt" | "updatedAt";

export interface ICreateExpense extends Omit<IExpense, OmitExpenseMeta> {}

export interface IUpdateExpense
    extends Omit<
        IExpense,
        OmitExpenseMeta | "month" | "categoryId" | "userId",
        "purchaseDate"
    > {}

export interface ExpenseState {
    expenses: IExpense[];
}

export type ExpenseActionsType = "add-expense";

export interface ExpenseActions {
    type: ExpenseActionsType;
    value: any;
}

export interface IExpenseContext extends ExpenseState {
    addExpense: (expense: ICreateExpense) => void;
}
export interface Expense {
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

export interface CreateExpense extends Omit<Expense, OmitExpenseMeta> { }

export interface UpdateExpense
    extends Omit<
        Expense,
        OmitExpenseMeta | "month" | "categoryId" | "userId", "purchaseDate"
    > { }

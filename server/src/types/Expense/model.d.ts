export interface Expense {
    id: string;
    userId: string;
    categoryId: string;
    label: string;
    imageUrl?: string;
    purchaseDate: Date;
    month: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    tags: string[]
}

export type OmitExpenseMeta = "id" | "createdAt" | "updatedAt";

export interface CreateExpense extends Omit<Expense, OmitExpenseMeta> {}

export interface UpdateExpense
    extends Omit<
        Expense,
        OmitExpenseMeta | "month" | "userId" | "purchaseDate"
    > {}

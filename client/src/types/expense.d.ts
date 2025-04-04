import { PaginationData } from './pagination';
import { IExpenseCategory } from './Settings/category';
import { ITag } from './Settings/tag';

export type ExpenseType = 'incoming' | 'outgoing';

export interface IExpense {
  id: string;
  userId: string;
  categoryId: string;
  label: string;
  purchaseDate: string;
  type: ExpenseType;
  month: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  tagList?: ITag[];
  category: IExpenseCategory;
}

export interface IExpenseList {
  [key: string]: string[];
}

export type OmitExpenseMeta = 'id' | 'createdAt' | 'updatedAt';

export interface ICreateExpense extends Omit<IExpense, OmitExpenseMeta> {}

export interface IUpdateExpense
  extends Omit<IExpense, OmitExpenseMeta | 'month' | 'categoryId' | 'userId', 'purchaseDate'> {}

export interface ExpenseState {
  expenses: IExpense[];
}

export type ExpenseActionsType = 'add-expense';

export interface ExpenseActions {
  type: ExpenseActionsType;
  value: any;
}

export interface IExpenseContext extends ExpenseState {
  addExpense: (expense: ICreateExpense) => void;
}

export interface ExpenseMonthDetails extends PaginationData {
  incomingTotal: number;
  outgoingTotal: number;
  data: IExpense[];
}

export interface ExpenseMonths {
  months: {
    [key: string]: string[];
  };
}

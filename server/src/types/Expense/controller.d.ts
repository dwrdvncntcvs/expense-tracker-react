import { RequestHandler } from "express";

export class IExpenseController {
    expenses: RequestHandler = async (req, res, next) => { };
    addExpense: RequestHandler = async (req, res, next) => { };
    expensesType: RequestHandler = async (req, res, next) => { };
    putExpense: RequestHandler = async (req, res, next) => { };
    deleteExpense: RequestHandler = async (req, res, next) => { };
}

export interface ExpenseMonths {
    [year: string]: number[]
}
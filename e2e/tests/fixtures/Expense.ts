import { APIRequestContext, Locator, Page } from "@playwright/test";
import ExpenseForm from "../components/expenseForm";
import { EXPENSE } from "../variables/home";

class Expense {
    modal: Locator;
    expenseForm: ExpenseForm;

    constructor(
        private modalId: string,
        private page: Page,
        private browserName: string,
        private request: APIRequestContext
    ) {
        this.expenseForm = new ExpenseForm(page);

        this.modal = this.page.locator("[id='`${this.modalId}`']");
    }

    async createDefaultExpense(monthNum?: number) {
        const expenseData = {
            amount: "10000",
            categoryId: "Hobby",
            description: `Sample from ${this.browserName}`,
            label: `Test 1 - ${this.browserName}`,
            purchaseDate: `${EXPENSE.YEAR}-${monthNum || EXPENSE.MONTH.NUM}-20`,
        };

        await this.expenseForm.fillExpenseForm(expenseData);

        await this.expenseForm.createExpenseBtn.click();
    }

    async removeDefaultExpense(monthNum?: number) {
        await this.request.delete(
            `http://localhost:5010/test/expenses/${
                monthNum || EXPENSE.MONTH.NUM
            }/${EXPENSE.YEAR}`
        );
    }
}

export default Expense;

import { Locator, Page } from "@playwright/test";

interface CreateExpense {
    label: string;
    description: string;
    categoryId: string;
    purchaseDate: string;
    amount: string;
}

class CreateExpenseForm {
    label: Locator;
    description: Locator;
    categoryId: Locator;
    purchaseDate: Locator;
    amount: Locator;
    createExpenseBtn: Locator;
    modalTitle: Locator;

    constructor(private page: Page) {
        this.modalTitle = this.page.getByRole("heading", {
            name: "Add Expense",
        });
        this.label = this.page.locator("input#label");
        this.description = this.page.locator("textarea#description");
        this.categoryId = this.page.locator("select#categoryId");
        this.purchaseDate = this.page.locator("input#purchaseDate");
        this.amount = this.page.locator("input#amount");
        this.createExpenseBtn = this.page.getByRole("button", {
            name: "Create Expense",
        });
    }

    async fillCreateExpenseForm(expense: CreateExpense) {
        await this.label.fill(expense.label);
        await this.description.fill(expense.description);
        await this.categoryId.selectOption({ label: expense.categoryId });
        await this.purchaseDate.fill(expense.purchaseDate);
        await this.amount.fill(expense.amount);
    }
}

export default CreateExpenseForm;

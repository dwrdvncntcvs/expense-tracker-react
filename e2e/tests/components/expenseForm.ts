import { Locator, Page } from "@playwright/test";

interface CreateExpense {
    label: string;
    description: string;
    categoryId: string;
    purchaseDate: string;
    amount: string;
}

type ErrorName = keyof Omit<CreateExpense, "description">;

class CreateExpenseForm {
    label: Locator;
    description: Locator;
    categoryId: Locator;
    purchaseDate: Locator;
    amount: Locator;
    createExpenseBtn: Locator;
    modalTitle: Locator;
    updateExpenseBtn: Locator;

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
        this.updateExpenseBtn = this.page.getByRole("button", {
            name: "Save",
        });
    }

    async fillCreateExpenseForm(expense: Partial<CreateExpense>) {
        if (expense.label) await this.label.fill(expense.label);
        if (expense.description)
            await this.description.fill(expense.description);
        if (expense.categoryId)
            await this.categoryId.selectOption({ label: expense.categoryId });
        if (expense.purchaseDate)
            await this.purchaseDate.fill(expense.purchaseDate);
        if (expense.amount) await this.amount.fill(expense.amount);
    }

    getErrorLocator(errorName: ErrorName, errorType: "req") {
        const errors = {
            label: {
                req: "Label is required",
            },
            categoryId: {
                req: "Category is required",
            },
            purchaseDate: {
                req: "Purchased Date is required",
            },
            amount: {
                req: "Amount is required",
            },
        };

        return this.page.getByText(errors[errorName][errorType]);
    }
}

export default CreateExpenseForm;

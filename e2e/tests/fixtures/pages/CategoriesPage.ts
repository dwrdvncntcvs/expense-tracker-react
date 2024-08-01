import { Locator, Page } from "@playwright/test";
import SettingsPage from "./SettingsPage";

class CategoriesPage extends SettingsPage {
    categoryField: Locator;
    addBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.categoryField = this.page.getByPlaceholder(
            "Enter category here..."
        );
        this.addBtn = this.page.getByRole("button", { name: "Add" });
    }

    async addCategory(category: string) {
        await this.categoryField.fill(category);
        await this.addBtn.click();
    }

    async removeCategory(category: string) {
        await this.page.getByTestId(`delete-${category}`).click();
    }
}

export default CategoriesPage;

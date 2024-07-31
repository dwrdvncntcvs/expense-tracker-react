import { Locator, Page } from "@playwright/test";
import SettingsPage from "./SettingsPage";

class CategoriesPage {
    settingsPage: SettingsPage;
    categoryField: Locator;
    addBtn: Locator;

    constructor(private page: Page) {
        this.settingsPage = new SettingsPage(this.page);
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

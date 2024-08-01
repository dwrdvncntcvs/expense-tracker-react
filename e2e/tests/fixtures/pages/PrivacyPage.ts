import { Locator, Page } from "@playwright/test";
import SettingsPage from "./SettingsPage";

type FieldType = "oldPasswordField" | "newPasswordField";

class PrivacyPage extends SettingsPage {
    oldPasswordField: Locator;
    newPasswordField: Locator;

    passwordToggle: Locator;
    updateBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.oldPasswordField = this.page.getByPlaceholder("Old Password");
        this.newPasswordField = this.page.getByPlaceholder("New Password");
        this.updateBtn = this.page.getByRole("button", {
            name: "Update Password",
        });
        this.passwordToggle = this.page.locator("#toggle-password-btn");
    }

    async formFields(data: { oldPassword: string; newPassword: string }) {
        for (let key of Object.keys(data)) {
            await this[`${key}Field` as FieldType].fill(data[key]);
        }
    }
}

export default PrivacyPage;

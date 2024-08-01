import { Locator, Page } from "@playwright/test";
import SettingsPage from "./SettingsPage";

type Field =
    | "usernameField"
    | "firstNameField"
    | "lastNameField"
    | "emailField";

export interface UserValues {
    usernameField: string;
    firstNameField: string;
    lastNameField: string;
    emailField: string;
}

class UserPage {
    usernameField: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    emailField: Locator;
    saveBtn: Locator;

    settingsPage: SettingsPage;

    constructor(private page: Page) {
        this.settingsPage = new SettingsPage(this.page);
        this.usernameField = this.page.locator("#username");
        this.firstNameField = this.page.locator("#first_name");
        this.lastNameField = this.page.locator("#last_name");
        this.emailField = this.page.locator("#email");
        this.saveBtn = this.page.getByRole("button", { name: "Save" });
    }

    async formField(userValues: UserValues) {
        for (let key of Object.keys(userValues)) {
            await this[key as Field].fill(userValues[key]);
        }
    }
}

export default UserPage;

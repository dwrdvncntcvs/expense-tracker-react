import { Page } from "@playwright/test";

type PageName = "categories" | "privacy" | "user" | "preferences";

class SettingsNav {
    constructor(private page: Page) {}

    async goto(pageName: PageName) {
        await this.page.goto(`/settings/${pageName}`);
    }
}

export default SettingsNav;

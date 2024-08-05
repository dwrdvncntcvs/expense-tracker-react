import type { Locator, Page } from "@playwright/test";
import SettingsPage from "./SettingsPage";

interface ThemeLocator {
    default: Locator;
    retro: Locator;
    ultraViolet: Locator;
    forest: Locator;
    army: Locator;
    github: Locator;
}

class PreferencePage extends SettingsPage {
    theme: ThemeLocator;

    constructor(page: Page) {
        super(page);
        for (let key of Object.keys(this.theme)) {
            this.theme[key] = this.page.locator(`theme-${key}`);
        }
    }
}

export default PreferencePage;

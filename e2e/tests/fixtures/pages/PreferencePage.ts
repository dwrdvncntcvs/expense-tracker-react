import type { Locator, Page } from "@playwright/test";
import SettingsPage from "./SettingsPage";
import Modal from "../../components/Modal";
import { type ThemeKey, themeTitle } from "../../variables/theme";

class PreferencePage extends SettingsPage {
    title: Locator;
    default: Locator;
    retro: Locator;
    ultra_violet: Locator;
    forest: Locator;
    army: Locator;
    github: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.page.getByRole("heading", { name: "Preferences" });
        this.default = this.page.locator("#theme-default");
        this.retro = this.page.locator("#theme-retro");
        this.ultra_violet = this.page.locator("#theme-ultra-violet");
        this.forest = this.page.locator("#theme-forest");
        this.army = this.page.locator("#theme-army");
        this.github = this.page.locator("#theme-github");
    }

    async applyTheme(name: ThemeKey) {
        const modal = new Modal(this.page, `${themeTitle[name]} Theme`);

        const [applyThemeBtn] = modal.getButtonsByText(["Apply Theme"]);

        await applyThemeBtn.click();
    }
}

export default PreferencePage;

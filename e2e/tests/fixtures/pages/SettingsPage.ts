import { Page } from "@playwright/test";
import SettingsNav from "../../components/SettingsNavigation";

class SettingsPage {
    nav: SettingsNav;

    constructor(private page: Page) {
        this.nav = new SettingsNav(this.page);
    }
}

export default SettingsPage;

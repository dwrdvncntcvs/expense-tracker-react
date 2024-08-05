import { Locator, Page } from "@playwright/test";

class Modal {
    title: Locator;

    constructor(private page: Page, title: string) {
        this.title = this.page.getByText(title);
    }

    getButtonsByText(titles: string[]): Locator[] {
        const locators: Locator[] = [];

        for (let title of titles) {
            locators.push(this.page.getByText(title));
        }

        return locators;
    }
}

export default Modal;

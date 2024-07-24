import { Locator, Page } from "@playwright/test";

class NavigationComponent {
    logo: Locator;
    home: Locator;
    settings: Locator;
    user: Locator;
    logoutBtn: Locator;

    constructor(private page: Page) {
        this.logo = this.page.getByAltText("Expense Tracker Logo");
        this.home = this.page.locator("a#home");
        this.settings = this.page.locator("a#settings");
        this.user = this.page.locator("a#user");
        this.logoutBtn = this.page.locator("button#logout");
    }
}

class HomePage {
    navigation: NavigationComponent;
    categoryLink: Locator;
    noExpenseMessage: Locator;
    createExpenseBtn: Locator;

    constructor(private page: Page) {
        this.navigation = new NavigationComponent(page);
        this.createExpenseBtn = this.page.locator("button#create-expense");
        this.categoryLink = this.page.locator("a#settings-category");
        this.noExpenseMessage = this.page.getByText("No Expenses Found!");
    }
}

export default HomePage;

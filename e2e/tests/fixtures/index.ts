import { test as base, expect } from "@playwright/test";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Authentication from "./Authentication";
import HomePage from "./pages/HomePage";
import Expense from "./Expense";
import CategoriesPage from "./pages/CategoriesPage";
import PrivacyPage from "./pages/PrivacyPage";
import SettingsPage from "./pages/SettingsPage";
import PreferencePage from "./pages/PreferencePage";

const test = base.extend<{
    signInPage: SignInPage;
    signUpPage: SignUpPage;
    auth: Authentication;
    homePage: HomePage;
    addExpense: Expense;
    categoriesPage: CategoriesPage;
    privacyPage: PrivacyPage;
    preferencePage: PreferencePage;
}>({
    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    signUpPage: async ({ page, request }, use) => {
        await use(new SignUpPage(page, request));
    },
    auth: async ({ page }, use) => {
        await use(new Authentication(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    addExpense: async ({ page, browserName, request }, use) => {
        await use(new Expense("add-expense-modal", page, browserName, request));
    },
    categoriesPage: async ({ page }, use) => {
        await use(new CategoriesPage(page));
    },
    privacyPage: async ({ page }, use) => {
        await use(new PrivacyPage(page));
    },
    preferencePage: async ({ page }, use) => {
        await use(new PreferencePage(page));
    },
});

export { expect };

export default test;

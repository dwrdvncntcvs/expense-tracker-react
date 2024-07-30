import { test as base, expect } from "@playwright/test";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Authentication from "./Authentication";
import HomePage from "./pages/HomePage";
import Expense from "./Expense";

const test = base.extend<{
    signInPage: SignInPage;
    signUpPage: SignUpPage;
    auth: Authentication;
    homePage: HomePage;
    addExpense: Expense;
    updateExpense: Expense;
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
});

export { expect };

export default test;

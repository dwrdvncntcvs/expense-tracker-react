import test, { expect } from "@playwright/test";
import SignInPage from "../fixtures/pages/SignInPage";
import Authentication from "../fixtures/Authentication";
import { EMAIL, PASSWORD } from "../variables/auth";

let signInPage: SignInPage;
let auth: Authentication;

test.beforeEach(async ({ page }) => {
    auth = new Authentication(page);
    signInPage = new SignInPage(page);
});

test("Navigate back - Should be back to sign in page when trying to access home page when not authenticated", async ({
    page,
}) => {
    await page.goto("/");

    await page.waitForURL("/sign-in");

    await expect(signInPage.signInButton).toBeVisible();
});

test("Navigate home - Should be automatically navigated to home page when already authenticated", async ({
    page,
}) => {
    await auth.authenticate(EMAIL, PASSWORD);

    await page.waitForURL("/");

    await page.goto("/sign-in");

    await page.waitForURL("/");

    await expect(page.locator("#logout")).toBeVisible();
});

import test, { expect } from "../fixtures";
import { EMAILS, PASSWORD } from "../variables/auth";

test.describe("Page Guards - Public Page", () => {
    test("Navigate back - Should be back to sign in page when trying to access home page when not authenticated", async ({
        signInPage,
        page,
    }) => {
        await page.goto("/");

        await page.waitForURL("/sign-in");

        await expect(signInPage.signInButton).toBeVisible();
    });

    test("Navigate home - Should be automatically navigated to home page when already authenticated", async ({
        page,
        auth,
    }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);

        await page.waitForURL("/");

        await page.goto("/sign-in");

        await page.waitForURL("/");

        await expect(page.locator("#logout")).toBeVisible();
    });
});

test.describe("Page Guards - Private Page", async () => {
    test.beforeEach(async ({ auth, page }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);

        await page.waitForURL("/");
    });

    test("Navigate back - should be back to home page when navigate from home page to sign in page", async ({
        page,
    }) => {
        await page.goto("/sign-in");

        await page.waitForURL("/sign-in");
        await page.waitForURL("/");

        await expect(page.locator("#logout")).toBeVisible();
    });

    test("Navigate back - should be back to home page when navigate from home page to sgn up page", async ({
        page,
    }) => {
        await page.goto("/sign-up");

        await page.waitForURL("/sign-up");
        await page.waitForURL("/");

        await expect(page.locator("#logout")).toBeVisible();
    });
});

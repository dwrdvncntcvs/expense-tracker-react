import test, { expect } from "../fixtures";
import { EMAIL, PASSWORD } from "../variables/auth";

test.describe("Page Guards", () => {
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
        await auth.authenticate(EMAIL, PASSWORD);

        await page.waitForURL("/");

        await page.goto("/sign-in");

        await page.waitForURL("/");

        await expect(page.locator("#logout")).toBeVisible();
    });
});

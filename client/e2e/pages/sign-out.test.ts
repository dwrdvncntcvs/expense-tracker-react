import { test, expect } from "@playwright/test";
import Authentication from "../fixtures/Authentication";
import { EMAIL, PASSWORD } from "../variables/auth";

let auth: Authentication;

test.beforeEach(async ({ page }) => {
    auth = new Authentication(page);
    await auth.authenticate(EMAIL, PASSWORD);
});

test("Success - Sign out", async ({ page }) => {
    await auth.authenticate(EMAIL, PASSWORD);

    await page.waitForURL("/");

    const logoutBtn = page.locator("#logout");

    await expect(logoutBtn).toBeVisible();

    await logoutBtn.click();

    await page.waitForURL("/sign-in");

    await expect(logoutBtn).not.toBeVisible();

    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});

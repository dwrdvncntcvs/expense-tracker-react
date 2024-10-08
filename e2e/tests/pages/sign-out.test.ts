import test, { expect } from "../fixtures";
import { EMAILS, PASSWORD } from "../variables/auth";

test.describe("Sign Out", () => {
    test.beforeEach(async ({ auth }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);
    });

    test("Success - Sign out", async ({ page }) => {
        await page.waitForURL("/");

        const logoutBtn = page.locator("#logout");

        await expect(logoutBtn).toBeVisible();

        await logoutBtn.click();

        await page.waitForURL("/sign-in");

        await expect(logoutBtn).not.toBeVisible();

        await expect(
            page.getByRole("button", { name: "Sign In" })
        ).toBeVisible();
    });
});

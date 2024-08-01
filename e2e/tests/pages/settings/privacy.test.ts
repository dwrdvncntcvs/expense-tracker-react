import test, { expect } from "../../fixtures";
import PrivacyPage from "../../fixtures/pages/PrivacyPage";
import { PASSWORD } from "../../variables/auth";
import { users } from "../../variables/user";

const user = users[1];

test.describe("Privacy Page", () => {
    test(`Successful - Change User Password for ${user.username}`, async ({
        page,
        auth,
        browserName,
    }) => {
        if (browserName !== "chromium") return;

        await auth.authenticate(user.email, PASSWORD);

        await page.waitForURL("/");

        const privacyPage = new PrivacyPage(page);

        await privacyPage.nav.goto("privacy");

        await expect(page.getByText("Privacy Settings")).toBeVisible();

        const NEW_PASSWORD = "sample2";

        await privacyPage.formFields({
            newPassword: NEW_PASSWORD,
            oldPassword: PASSWORD,
        });

        await privacyPage.updateBtn.click();

        const toastContainer = page.locator("#success-toast");
        const toastText = toastContainer.getByText(
            "Password changed successfully"
        );

        await expect(toastContainer).toHaveClass(/text-success/);
        await expect(toastText).toBeVisible();
        await page.waitForTimeout(5000);
        await expect(toastText).not.toBeVisible();

        await auth.signOut();

        await page.waitForURL("/sign-in");

        await auth.authenticate(user.email, NEW_PASSWORD);

        await page.waitForURL("/");

        await expect(page).toHaveURL("http://localhost:5173/");

        await privacyPage.nav.goto("privacy");
        await privacyPage.formFields({
            newPassword: PASSWORD,
            oldPassword: NEW_PASSWORD,
        });
        await privacyPage.updateBtn.click();

        await expect(toastContainer).toHaveClass(/text-success/);
        await expect(toastText).toBeVisible();
        await page.waitForTimeout(5000);
        await expect(toastText).not.toBeVisible();
    });
});

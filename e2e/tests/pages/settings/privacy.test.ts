import test, { expect } from "../../fixtures";
import PrivacyPage from "../../fixtures/pages/PrivacyPage";
import { PASSWORD } from "../../variables/auth";
import { users } from "../../variables/user";

const user = users[1];

test.describe("Privacy Page", () => {
    test.beforeEach(async ({ auth, page, privacyPage }) => {
        await auth.authenticate(user.email, PASSWORD);

        await page.waitForURL("/");

        await privacyPage.nav.goto("privacy");
    });

    test("Toggle password to text & vice versa", async ({ privacyPage }) => {
        await privacyPage.formFields({
            newPassword: "sample2",
            oldPassword: PASSWORD,
        });
        await privacyPage.passwordToggle.click();

        await expect(privacyPage.newPasswordField).toHaveAttribute(
            "type",
            "text"
        );
        await expect(privacyPage.oldPasswordField).toHaveAttribute(
            "type",
            "text"
        );

        await privacyPage.passwordToggle.click();

        await expect(privacyPage.newPasswordField).toHaveAttribute(
            "type",
            "password"
        );
        await expect(privacyPage.oldPasswordField).toHaveAttribute(
            "type",
            "password"
        );
    });

    test(`Successful - Change User Password for ${user.username}`, async ({
        page,
        auth,
        browserName,
        privacyPage,
    }) => {
        if (browserName !== "chromium") return;

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

        await expect(toastContainer).toHaveClass(/outline-success/);
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

        await expect(toastContainer).toHaveClass(/outline-success/);
        await expect(toastText).toBeVisible();
        await page.waitForTimeout(5000);
        await expect(toastText).not.toBeVisible();
    });
});

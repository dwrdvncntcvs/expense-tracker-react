import test, { expect } from "../../fixtures";
import UserPage from "../../fixtures/pages/UserPage";
import { setUserValues } from "../../utils/user";
import { PASSWORD } from "../../variables/auth";
import { users } from "../../variables/user";

const user = users[2];

test.describe("User Settings", () => {
    test(`Successfully Updating account for ${user.username}`, async ({
        page,
        auth,
        browserName,
    }) => {
        if (browserName !== "chromium") return;

        await auth.authenticate(user.email, PASSWORD);

        await page.waitForURL("/");

        const userPage = new UserPage(page);

        await userPage.nav.goto("user");

        await expect(page.getByText("User Information")).toBeVisible();

        await userPage.formField(setUserValues(user));

        await userPage.saveBtn.click();

        const toastContainer = page.locator("#success-toast");
        const toastMessage = toastContainer.getByText(
            "User updated successfully"
        );

        await expect(toastMessage).toBeVisible();
        await expect(toastContainer).toHaveClass(/text-success/);

        await page.waitForTimeout(5000);

        await expect(toastMessage).not.toBeVisible();

        await userPage.formField(setUserValues(user, { reverse: true }));
        await userPage.saveBtn.click();
    });
});

import test, { expect } from "../../fixtures";
import UserPage from "../../fixtures/pages/UserPage";
import { setUserValues } from "../../utils/user";
import { PASSWORD } from "../../variables/auth";
import { users } from "../../variables/user";

test.describe("User Settings", () => {
    users.slice(1).forEach((val) => {
        test(`Successfully Updating account for ${val.username}`, async ({
            page,
            auth,
            browserName,
        }) => {
            if (browserName !== "chromium") return;

            await auth.authenticate(val.email, PASSWORD);

            await page.waitForURL("/");

            await page.goto("/settings/user");

            await expect(page.getByText("User Information")).toBeVisible();

            const userPage = new UserPage(page);

            await userPage.formField(setUserValues(val));

            await userPage.saveBtn.click();

            const toastContainer = page.locator("#success-toast");
            const toastMessage = toastContainer.getByText(
                "User updated successfully"
            );

            await expect(toastMessage).toBeVisible();
            await expect(toastContainer).toHaveClass(/text-success/);

            await page.waitForTimeout(5000);

            await expect(toastMessage).not.toBeVisible();

            await userPage.formField(setUserValues(val, { reverse: true }));
            await userPage.saveBtn.click();
        });
    });
});

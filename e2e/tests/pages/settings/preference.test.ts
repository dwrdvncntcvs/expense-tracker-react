import Modal from "../../components/Modal";
import test, { expect } from "../../fixtures";
import { EMAILS, PASSWORD } from "../../variables/auth";
import { themeKeys, themeTitle } from "../../variables/theme";

test.describe("Preference Settings Page", () => {
    test.beforeEach(async ({ auth, page, preferencePage }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);

        await page.waitForURL("/");
        await preferencePage.nav.goto("preferences");

        await page.waitForURL("/settings/preferences");

        const hasClass = await page
            .locator("#theme-default")
            .evaluate((element) => {
                return element.classList.contains("outline-primary");
            });

        if (!hasClass) {
            await page.locator("#theme-default").click();
            await preferencePage.applyTheme("default");

            await expect(page.locator("#theme-default")).toHaveClass(
                /outline-primary/
            );
        }
    });

    themeKeys.slice(1).forEach((key) => {
        test(`Selecting ${themeTitle[key]} Theme`, async ({
            page,
            preferencePage,
        }) => {
            await preferencePage[key].click();

            const modal = new Modal(page, `${themeTitle[key]} Theme`);

            const [cancelBtn, applyBtn] = modal.getButtonsByText([
                "Cancel",
                "Apply Theme",
            ]);

            await expect(modal.title).toBeVisible();
            await expect(cancelBtn).toBeVisible();
            await expect(applyBtn).toBeVisible();

            await applyBtn.click();

            await page.waitForTimeout(5000);

            const themeBtn = page.locator(
                `[id='theme-${key.replace("_", "-")}']`
            );

            await expect(themeBtn).toHaveClass(/outline-primary/);
        });
    });
});

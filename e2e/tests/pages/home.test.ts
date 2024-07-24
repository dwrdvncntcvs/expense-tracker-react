import test, { expect } from "../fixtures";
import { EMAILS, PASSWORD } from "../variables/auth";

test.describe("Home page w/ newly created account", () => {
    test.beforeEach(async ({ auth, homePage, page }) => {
        await auth.authenticate(EMAILS[1], PASSWORD);

        await page.waitForURL("/");

        await expect(homePage.navigation.logo).toBeVisible();
        await expect(homePage.navigation.home).toBeVisible();
        await expect(homePage.navigation.home).toHaveClass(
            /text-plain bg-primary/
        );
        await expect(homePage.navigation.settings).toBeVisible();
        await expect(homePage.navigation.settings).toHaveClass(
            /text-secondary/
        );
        await expect(homePage.navigation.user).toBeVisible();
        await expect(homePage.navigation.user).toHaveClass(/text-secondary/);
        await expect(homePage.navigation.logoutBtn).toBeVisible();
    });

    test("render page without data presented and with instruction", async ({
        homePage,
    }) => {
        await expect(homePage.noExpenseMessage).toBeVisible();

        await expect(homePage.categoryLink).toBeVisible();

        await homePage.categoryLink.hover();

        await expect(homePage.categoryLink).toHaveClass(
            /hover:text-plain hover:bg-primary/
        );

        await expect(homePage.createExpenseBtn).not.toBeVisible();
    });

    test("can navigate from home to category settings page", async ({
        homePage,
        page,
    }) => {
        await expect(homePage.categoryLink).toBeVisible();

        await homePage.categoryLink.click();

        await page.waitForURL("/settings/categories");

        await expect(
            page.getByRole("heading", { name: "Category", exact: true })
        ).toBeVisible();
    });
});

test.describe("Home page w/ partially created account", () => {
    test.beforeEach(async ({ auth, page }) => {
        await auth.authenticate(EMAILS[2], PASSWORD);

        await page.waitForURL("/");
    });

    test("render without the list of data and with instruction and create expense btn", async ({
        homePage,
    }) => {
        await expect(homePage.noExpenseMessage).toBeVisible();

        await expect(homePage.categoryLink).not.toBeVisible();

        await expect(homePage.createExpenseBtn).toBeVisible();
    });

    test("render create expense modal by create expense button", async ({
        homePage,
        page,
    }) => {
        await expect(homePage.createExpenseBtn).toBeVisible();

        await homePage.createExpenseBtn.click();

        await page.waitForTimeout(2000);

        await expect(page.locator("div#add-expense-modal")).toBeAttached();
    });
});

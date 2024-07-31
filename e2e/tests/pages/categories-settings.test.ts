import test, { expect } from "../fixtures";
import { EMAILS, PASSWORD } from "../variables/auth";

test.describe("Categories Page", () => {
    test.beforeEach(async ({ auth, page }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);
        await page.waitForURL("/");
    });

    test("Create Category", async ({
        categoriesPage,
        page,
        browserName,
        request,
    }) => {
        await categoriesPage.settingsPage.nav.goto("categories");

        const categoryData = `Category - ${browserName}`;

        await categoriesPage.addCategory(categoryData);

        await expect(
            page.getByText(categoryData, { exact: true })
        ).toBeVisible();

        await request.post("http://localhost:5010/test/categories/remove", {
            data: { name: categoryData },
        });
    });
});

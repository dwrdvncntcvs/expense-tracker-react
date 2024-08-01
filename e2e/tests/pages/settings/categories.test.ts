import test, { expect } from "../../fixtures";
import { EMAILS, PASSWORD } from "../../variables/auth";

test.describe("Categories Page", () => {
    test.beforeEach(async ({ auth, page, categoriesPage }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);
        await page.waitForURL("/");
        await categoriesPage.nav.goto("categories");
    });

    test("Create Category", async ({
        categoriesPage,
        page,
        browserName,
        request,
    }) => {
        const categoryData = `Category - ${browserName}`;

        await categoriesPage.addCategory(categoryData);

        await expect(
            page.getByText(categoryData, { exact: true })
        ).toBeVisible();

        await request.post("http://localhost:5010/test/categories/remove", {
            data: { name: categoryData },
        });
    });

    test("Delete Category", async ({ categoriesPage, page, browserName }) => {
        const categoryData = `del - Category - ${browserName}`;

        await categoriesPage.addCategory(categoryData);

        await expect(
            page.getByText(categoryData, { exact: true })
        ).toBeVisible();

        await categoriesPage.removeCategory(categoryData);

        await expect(
            page.getByText(categoryData, { exact: true })
        ).not.toBeVisible();
    });
});

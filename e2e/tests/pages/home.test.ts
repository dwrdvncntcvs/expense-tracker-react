import CreateExpenseForm from "../components/expenseForm";
import test, { expect } from "../fixtures";
import { EMAILS, MONTHS, PASSWORD } from "../variables/auth";

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

test.describe("Home page w/ account that has expenses", () => {
    test.beforeEach(async ({ auth, page }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);

        await page.waitForURL("/");
    });

    test("Home page render years items", async ({ page }) => {
        const yearList = page.locator(".year-item h2");

        const yearListValues = await yearList.allTextContents();

        for (let year of yearListValues) {
            await expect(page.getByText(year)).toBeVisible();

            const analyticsButton = page.locator(`[id='${year}-analytics']`);

            await expect(analyticsButton).toBeVisible();

            const monthList = page
                .locator(`[id='${year}']`)
                .locator(".month-item");

            const monthTexts = await monthList.allTextContents();

            for (const text of monthTexts) {
                const monthEl = page
                    .locator(`[id='${year}']`)
                    .getByRole("link", { name: text });

                await monthEl.hover();
                await expect(monthEl).toHaveClass(/hover:bg-secondary/);
            }
        }
    });
});

test.describe("Create Expense", () => {
    test.beforeEach(async ({ auth, page, homePage }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);

        await page.waitForURL("/");

        await homePage.createExpenseBtn.click();

        await page.waitForSelector("div#add-expense-modal");
    });

    test("successfully create expense", async ({ page, browserName }) => {
        const year = 2025;
        const month = 10;

        const createExpenseForm = new CreateExpenseForm(page);

        await expect(createExpenseForm.modalTitle).toBeVisible();

        await createExpenseForm.fillCreateExpenseForm({
            amount: "10000",
            categoryId: "Hobby",
            description: `Sample from ${browserName}`,
            label: `Test 1 - ${browserName}`,
            purchaseDate: `${year}-${month}-20`,
        });

        await createExpenseForm.createExpenseBtn.click();

        const toastMessage = page.getByText("Expense successfully added");

        await expect(toastMessage).toBeVisible();

        await page.waitForTimeout(5000);

        await expect(toastMessage).not.toBeVisible();

        const yearList = page.locator(".year-item h2");

        const yearListValues = await yearList.allTextContents();

        for (let yearVal of yearListValues) {
            if (+yearVal === year) {
                await expect(page.getByText(yearVal)).toBeVisible();

                const analyticsButton = page.locator(
                    `[id='${yearVal}-analytics']`
                );

                await expect(analyticsButton).toBeVisible();

                const monthList = page
                    .locator(`[id='${yearVal}']`)
                    .locator(".month-item");

                const monthTexts = await monthList.allTextContents();

                for (const text of monthTexts) {
                    const monthEl = page
                        .locator(`[id='${yearVal}']`)
                        .getByRole("link", { name: text });

                    await monthEl.hover();
                    await expect(monthEl).toHaveClass(/hover:bg-secondary/);
                }
            }
        }
    });

    test("creating expense with empty fields value", async ({ page }) => {
        const createExpenseForm = new CreateExpenseForm(page);

        await expect(createExpenseForm.modalTitle).toBeVisible();

        createExpenseForm.fillCreateExpenseForm({
            amount: "",
            categoryId: "",
            description: "",
            label: "",
            purchaseDate: "",
        });

        await createExpenseForm.createExpenseBtn.click();

        await expect(
            createExpenseForm.getErrorLocator("label", "req")
        ).toBeVisible();
        await expect(
            createExpenseForm.getErrorLocator("categoryId", "req")
        ).toBeVisible();
        await expect(
            createExpenseForm.getErrorLocator("amount", "req")
        ).toBeVisible();
        await expect(
            createExpenseForm.getErrorLocator("purchaseDate", "req")
        ).toBeVisible();
    });
});

import CreateExpenseForm from "../components/expenseForm";
import test, { expect } from "../fixtures";
import { EMAILS, MONTHS, PASSWORD } from "../variables/auth";
import { EXPENSE } from "../variables/home";

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

test.describe.serial("Expenses Feature", () => {
    test.beforeEach(async ({ auth, page }) => {
        await auth.authenticate(EMAILS[0], PASSWORD);

        await page.waitForURL("/");
    });

    test("successfully create expense", async ({
        page,
        browserName,
        request,
        homePage,
    }) => {
        await homePage.createExpenseBtn.click();

        await page.waitForSelector("div#add-expense-modal");

        const year = EXPENSE.YEAR;
        const month = EXPENSE.MONTH.NUM;
        const monthName = EXPENSE.MONTH.NAME;
        const shortMonthName = EXPENSE.MONTH.SHORT;

        const createExpenseForm = new CreateExpenseForm(page);

        await expect(createExpenseForm.modalTitle).toBeVisible();

        const expenseData = {
            amount: "10000",
            categoryId: "Hobby",
            description: `Sample from ${browserName}`,
            label: `Test 1 - ${browserName}`,
            purchaseDate: `${year}-${month}-20`,
        };

        await createExpenseForm.fillCreateExpenseForm(expenseData);

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
                    if (text === shortMonthName) {
                        const monthEl = page
                            .locator(`[id='${yearVal}']`)
                            .getByRole("link", { name: text });

                        await monthEl.hover();
                        await expect(monthEl).toHaveClass(/hover:bg-secondary/);

                        await monthEl.click();

                        await page.waitForURL(`/${monthName}/${year}`);

                        await expect(
                            page.getByRole("heading", {
                                name: new RegExp(monthName, "i"),
                            })
                        ).toBeVisible();

                        const expenseCard = page.locator(".expense-card h3");

                        const expenseCardH3s =
                            await expenseCard.allTextContents();

                        for (let i = 0; i < expenseCardH3s.length; i++) {
                            const val = expenseCardH3s[i];
                            if (val === expenseData.label) {
                                const expenseItem = page.getByTestId(
                                    `expense-${i}`
                                );
                                await expect(
                                    expenseItem.getByText(val)
                                ).toBeVisible();

                                await expenseItem.hover();

                                await expect(
                                    expenseItem.locator("button#update-expense")
                                ).toBeVisible();

                                await expect(
                                    expenseItem.locator("button#delete-expense")
                                ).toBeVisible();

                                break;
                            }
                        }
                    }

                    break;
                }
                break;
            }
        }

        // await request.delete(
        //     `http://localhost:5010/test/expenses/${EXPENSE.MONTH.NUM}/${EXPENSE.YEAR}`
        // );
    });

    test("creating expense with empty fields value", async ({
        page,
        homePage,
    }) => {
        await homePage.createExpenseBtn.click();

        await page.waitForSelector("div#add-expense-modal");
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

    test("successfully update expense", async ({ page, browserName }) => {
        await page.goto(`/${EXPENSE.MONTH.NAME}/${EXPENSE.YEAR}`);

        await expect(
            page.getByRole("heading", {
                name: new RegExp(EXPENSE.MONTH.NAME, "i"),
            })
        ).toBeVisible();

        const expenseCards = page.locator(".expense-card h3");
        const expenseCardsValues = await expenseCards.allTextContents();

        for (let i = 0; expenseCardsValues.length > i; i++) {
            const expenseLabel = `Test 1 - ${browserName}`;

            if (expenseLabel === expenseCardsValues[i]) {
                const card = page.getByTestId(`expense-${i}`);

                await expect(card.getByText(expenseLabel)).toBeVisible();

                await card.getByText(expenseLabel).hover();

                const updateExpenseBtn = card.locator("button#update-expense");
                const deleteExpenseBtn = card.locator("button#delete-expense");

                await expect(updateExpenseBtn).toBeVisible();
                await expect(deleteExpenseBtn).toBeVisible();

                await updateExpenseBtn.click();

                const expenseForm = new CreateExpenseForm(page);

                const modalLabel = page.getByText(`Edit ${expenseLabel}`);

                await expect(modalLabel).toBeVisible();

                expect(expenseForm.amount.isDisabled()).toBeTruthy();
                expect(expenseForm.purchaseDate.isDisabled()).toBeTruthy();

                const updatedLabel = `${expenseLabel} Updated`;

                await expenseForm.fillCreateExpenseForm({
                    label: updatedLabel,
                });

                await expenseForm.updateExpenseBtn.click();

                await expect(modalLabel).not.toBeVisible();

                await card.getByText(updatedLabel).hover();

                await updateExpenseBtn.click();

                await expenseForm.fillCreateExpenseForm({
                    label: expenseLabel,
                });

                await expenseForm.updateExpenseBtn.click();

                await expect(modalLabel).not.toBeVisible();

                break;
            }
        }
    });
});

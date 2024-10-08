import test, { expect } from "../fixtures";
import { EMAILS, PASSWORD } from "../variables/auth";

test.describe("Sign In Page", () => {
    test.beforeEach(async ({ signInPage }) => {
        signInPage.goto();
    });

    test("Successful - Submitting valid fields", async ({
        page,
        signInPage,
    }) => {
        await signInPage.inputField("email", EMAILS[0]);
        await signInPage.inputField("password", PASSWORD);
        await signInPage.signInButton.click();

        await page.waitForURL("/");

        await expect(signInPage.signInButton).not.toBeVisible();
    });

    test("Navigation - Go to sign up when 'Doesn't have an account?' was clicked", async ({
        signInPage,
        page,
    }) => {
        await signInPage.noAccount.click();

        await page.waitForURL("/sign-up");

        await expect(
            page.getByRole("button", { name: "Sign Up" })
        ).toBeVisible();
    });

    test("Failed - Submitting empty fields", async ({ signInPage }) => {
        await signInPage.inputField("email");
        await signInPage.inputField("password");

        await signInPage.signInButton.click();

        await expect(signInPage.fieldError("Email is required")).toBeVisible();
        await expect(
            signInPage.fieldError("Password is required")
        ).toBeVisible();
    });

    test("Failed - Signing in with incorrect credentials", async ({
        page,
        signInPage,
    }) => {
        await signInPage.inputField("email", EMAILS[0]);
        await signInPage.inputField("password", "incorrect-pass");

        await signInPage.signInButton.click();

        const toast = page.getByText("Invalid Username or Password");

        await expect(toast).toBeVisible();

        await page.waitForTimeout(5000);

        await expect(toast).not.toBeVisible();
    });

    test("Failed - Signing in with invalid email format", async ({
        signInPage,
    }) => {
        await signInPage.inputField("email", "sample.com");
        await signInPage.inputField("password", PASSWORD);
        await signInPage.signInButton.click();

        await expect(
            signInPage.fieldError("Invalid email format")
        ).toBeVisible();
    });
});

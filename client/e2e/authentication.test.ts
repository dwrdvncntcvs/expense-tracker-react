import { test as base, expect } from "@playwright/test";
import SignUpPage from "./fixtures/pages/SignUpPage";
import SignInPage from "./fixtures/pages/SignInPage";
import Authentication from "./fixtures/Authentication";

const test = base.extend<{
    signUpPage: SignUpPage;
    signInPage: SignInPage;
    auth: Authentication;
}>({
    signUpPage: async ({ page, request }, use) => {
        const signUpPageInstance = new SignUpPage(page, request);
        await signUpPageInstance.goto();
        await use(signUpPageInstance);
    },
    signInPage: async ({ page }, use) => {
        const signInPageInstance = new SignInPage(page);
        await signInPageInstance.goto();
        await use(signInPageInstance);
    },
    auth: async ({ page }, use) => {
        const authInstance = new Authentication(page);
        await use(authInstance);
    },
});

test.describe("Account Sign Up", () => {
    const signUpData = {
        first_name: {
            placeholder: "First Name",
            value: "Test 1",
            error: {
                required: "First name is required",
            },
        },
        last_name: {
            placeholder: "Last Name",
            value: "Test",
            error: {
                required: "Last name is required",
            },
        },
        username: {
            placeholder: "Username",
            value: "test_username",
            error: {
                required: "Username is required",
            },
        },
        email: {
            placeholder: "Email",
            value: "test@sample.com",
            error: {
                required: "Email is required",
                format: "Invalid email format",
            },
        },
        password: {
            placeholder: "Password",
            value: "sample1",
            error: {
                required: "Password is required",
                min: "Password should be at least 5 characters",
            },
        },
    };

    test("Successful -  Submitting valid fields", async ({
        signUpPage,
        page,
    }) => {
        await signUpPage.inputField("first_name", signUpData.first_name.value);
        await signUpPage.inputField("last_name", signUpData.last_name.value);
        await signUpPage.inputField("username", signUpData.username.value);
        await signUpPage.inputField("email", signUpData.email.value);
        await signUpPage.inputField("password", signUpData.password.value);

        await signUpPage.signUpButton.click();

        await page.waitForURL("/sign-in");

        const toast = page.getByText("Account Created Successfully");

        await expect(toast).toBeVisible();

        await page.waitForTimeout(5000);

        await expect(toast).not.toBeVisible();

        await signUpPage.removeCreatedUser(signUpData.email.value);
    });

    test("Navigate - Clicking 'Already have an account?'", async ({
        page,
        signUpPage,
    }) => {
        await signUpPage.alreadyHaveAnAccount.click();

        await page.waitForURL("/sign-in");

        await expect(
            page.getByRole("button", { name: "Sign In" })
        ).toBeVisible();
    });

    test("Failure - Submitting empty fields", async ({ page, signUpPage }) => {
        await signUpPage.inputField("first_name");
        await signUpPage.inputField("last_name");
        await signUpPage.inputField("username");
        await signUpPage.inputField("email");
        await signUpPage.inputField("password");

        await page.getByRole("button", { name: "Sign Up" }).click();

        await expect(
            signUpPage.fieldError(signUpData.first_name.error.required)
        ).toBeVisible();
        await expect(
            signUpPage.fieldError(signUpData.last_name.error.required)
        ).toBeVisible();
        await expect(
            signUpPage.fieldError(signUpData.email.error.required)
        ).toBeVisible();
        await expect(
            signUpPage.fieldError(signUpData.username.error.required)
        ).toBeVisible();
        await expect(
            signUpPage.fieldError(signUpData.password.error.required)
        ).toBeVisible();
    });

    test("Failure - Submitting invalid email", async ({ signUpPage }) => {
        await signUpPage.inputField("first_name", signUpData.first_name.value);
        await signUpPage.inputField("last_name", signUpData.last_name.value);
        await signUpPage.inputField("username", signUpData.username.value);
        await signUpPage.inputField("email", "sample.com");
        await signUpPage.inputField("password", signUpData.password.value);

        await signUpPage.signUpButton.click();

        await expect(
            signUpPage.fieldError(signUpData.email.error.format)
        ).toBeVisible();
    });

    test("Failure - Submitting password containing below 5 characters", async ({
        signUpPage,
    }) => {
        await signUpPage.inputField("first_name", signUpData.first_name.value);
        await signUpPage.inputField("last_name", signUpData.last_name.value);
        await signUpPage.inputField("username", signUpData.username.value);
        await signUpPage.inputField("email", signUpData.email.value);
        await signUpPage.inputField("password", "1234");
        await signUpPage.signUpButton.click();

        await expect(
            signUpPage.fieldError(signUpData.password.error.min)
        ).toBeVisible();
    });
});

const EMAIL = "sample@sample.com";
const PASSWORD = "sample1";

test.describe("Account Sign In Page", () => {
    test("Successful - Submitting valid fields", async ({
        signInPage,
        page,
    }) => {
        await signInPage.inputField("email", EMAIL);
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
        signInPage,
        page,
    }) => {
        await signInPage.inputField("email", EMAIL);
        await signInPage.inputField("password", "incorrect-pass");

        await signInPage.signInButton.click();

        const toast = await page.getByText("Invalid Username or Password");

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

test.describe("Account Sign Out", () => {
    test.beforeEach(async ({ auth }) => {
        await auth.authenticate(EMAIL, PASSWORD);
    });

    test("Success - Sign out", async ({ page, auth }) => {
        await auth.authenticate(EMAIL, PASSWORD);

        await page.waitForURL("/");

        const logoutBtn = page.locator("#logout");

        await expect(logoutBtn).toBeVisible();

        await logoutBtn.click();

        await page.waitForURL("/sign-in");

        await expect(logoutBtn).not.toBeVisible();

        await expect(
            page.getByRole("button", { name: "Sign In" })
        ).toBeVisible();
    });
});

test.describe("Page Guards - Public", () => {
    test("Navigate back - Should be back to sign in page when trying to access home page when not authenticated", async ({
        page,
        signInPage,
    }) => {
        await page.goto("/");

        await page.waitForURL("/sign-in");

        await expect(signInPage.signInButton).toBeVisible();
    });

    test("Navigate home - Should be automatically navigated to home page when already authenticated", async ({
        auth,
        page,
    }) => {
        await auth.authenticate(EMAIL, PASSWORD);

        await page.waitForURL("/");

        await page.goto("/sign-in");

        await page.waitForURL("/");

        await expect(page.locator("#logout")).toBeVisible();
    });
});

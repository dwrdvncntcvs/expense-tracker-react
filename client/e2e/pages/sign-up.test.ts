import { expect, test } from "@playwright/test";
import SignUpPage from "../fixtures/pages/SignUpPage";

let signUpPage: SignUpPage;

test.beforeEach(async ({ page, request }) => {
    await page.goto("/sign-up", { waitUntil: "commit" });
    signUpPage = new SignUpPage(page, request);
});

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

test("Successful -  Submitting valid fields", async ({ page }) => {
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

test("Navigate - Clicking 'Already have an account?'", async ({ page }) => {
    await signUpPage.alreadyHaveAnAccount.click();

    await page.waitForURL("/sign-in");

    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});

test("Failure - Submitting empty fields", async ({ page }) => {
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

test("Failure - Submitting invalid email", async () => {
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

test("Failure - Submitting password containing below 5 characters", async () => {
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

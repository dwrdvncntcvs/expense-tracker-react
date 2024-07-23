import type { Locator, Page, APIRequestContext } from "@playwright/test";

export type InputType =
    | "first_name"
    | "last_name"
    | "username"
    | "email"
    | "password";

export default class SignUpPage {
    private firstNameField: Locator;
    private lastNameField: Locator;
    private usernameField: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    alreadyHaveAnAccount: Locator;
    signUpButton: Locator;

    constructor(private page: Page, private request: APIRequestContext) {
        this.firstNameField = this.createInputLocator("First Name");
        this.lastNameField = this.createInputLocator("Last Name");
        this.usernameField = this.createInputLocator("Username");
        this.emailField = this.createInputLocator("Email");
        this.passwordField = this.createInputLocator("Password");
        this.signUpButton = this.page.getByRole("button", { name: "Sign Up" });
        this.alreadyHaveAnAccount = this.page.getByRole("link", {
            name: "Already have an account?",
        });
    }

    async goto() {
        await this.page.goto("/sign-up");
        await this.page.waitForLoadState("domcontentloaded");
    }

    fieldError(message: string) {
        return this.page.getByText(message);
    }

    async inputField(type: InputType, value: string = "") {
        switch (type) {
            case "first_name": {
                await this.firstNameField.fill(value);
                break;
            }
            case "last_name": {
                await this.lastNameField.fill(value);
                break;
            }
            case "email": {
                await this.emailField.fill(value);
                break;
            }
            case "password": {
                await this.passwordField.fill(value);
                break;
            }
            case "username": {
                await this.usernameField.fill(value);
                break;
            }
            default: {
                throw new Error("Invalid type");
            }
        }
    }

    async removeCreatedUser(email: string) {
        await this.request.post("http://localhost:5010/test/delete-user", {
            data: { email },
        });
    }

    private createInputLocator(placeholder: string) {
        return this.page.locator(`[placeholder="${placeholder}"]`);
    }
}

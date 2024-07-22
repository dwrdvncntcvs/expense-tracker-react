import type { Locator, Page } from "@playwright/test";

export type InputType = "email" | "password";

export default class SignInPage {
    private emailField: Locator;
    private passwordField: Locator;
    noAccount: Locator;
    signInButton: Locator;

    constructor(private page: Page) {
        this.emailField = this.createInputLocator("Email");
        this.passwordField = this.createInputLocator("Password");
        this.signInButton = this.page.getByRole("button", { name: "Sign In" });
        this.noAccount = this.page.getByRole("link", {
            name: "Doesn't have an account yet?",
        });
    }

    async goto() {
        await this.page.goto("/sign-in", { waitUntil: "commit" });
    }

    fieldError(message: string) {
        return this.page.getByText(message);
    }

    async inputField(type: InputType, value: string = "") {
        switch (type) {
            case "email": {
                await this.emailField.fill(value);
                break;
            }
            case "password": {
                await this.passwordField.fill(value);
                break;
            }

            default: {
                throw new Error("Invalid type");
            }
        }
    }

    private createInputLocator(placeholder: string) {
        return this.page.locator(`[placeholder="${placeholder}"]`);
    }
}

import { Page } from "@playwright/test";
import SignInPage from "./pages/SignInPage";

export default class Authentication {
    constructor(private readonly page: Page) {}

    async authenticate(email: string, password: string) {
        const signInInstance = new SignInPage(this.page);

        await signInInstance.goto();

        await signInInstance.inputField("email", email);
        await signInInstance.inputField("password", password);

        await signInInstance.signInButton.click();
    }

    async signOut() {
        // await this.page.waitForURL("/");

        await this.page.locator("#logout").click();
    }
}

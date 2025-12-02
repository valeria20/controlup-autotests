import { Page, Locator } from "@playwright/test";
import { LoginPageSelectors } from "../selectors/selectors"
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private _usernameInput: Locator;
  private _passwordInput: Locator;
  private _loginButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.setupLocators();
  }

  private setupLocators(): void {
    this._usernameInput = this.getLocatorByDataTest(LoginPageSelectors.usernameInput);
    this._passwordInput = this.getLocatorByDataTest(LoginPageSelectors.passwordInput);
    this._loginButton = this.getLocatorByDataTest(LoginPageSelectors.loginButton);
  }

  async goto(url = ""): Promise<void> {
    await this.page.goto(url);
  }

  async login(username: string, password: string): Promise<void> {
    await this._usernameInput.fill(username);
    await this._passwordInput.fill(password);
    await this._loginButton.click();
  }

  async openPageAndLogin(username: string, password: string, url = ""): Promise<void> {
    await this.goto(url);
    await this.login(username, password);
  }
}
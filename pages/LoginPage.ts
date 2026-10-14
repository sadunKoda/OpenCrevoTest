// AUTO-GENERATED — edit this file directly; use crevoai_generate_code create/register_page for structural changes
import { BasePage } from './BasePage';
import { loginExpected as expected } from '@config/page-loader';
import { expect } from '@playwright/test';


export class LoginPage extends BasePage {
  readonly path = '/';

  // ── Locators ──────────────────────────────────────────────────────────
  // locator-helper: testid_xpath
  private usernameInput = this.page.locator('//*[@data-test="username"]');
  // locator-helper: testid_xpath
  private passwordInput = this.page.locator('//*[@data-test="password"]');
  // locator-helper: testid_xpath
  private loginButtonButton = this.page.locator('//*[@data-test="login-button"]');
  // locator-helper: testid_xpath
  private errorDiv = this.page.locator('//*[@data-test="error"]');
  // locator-helper: role_name
  private productsHeading = this.page.getByRole('heading', { name: 'Products', exact: true });

  // ── Steps ──────────────────────────────────────────────────────────────
  /**
   * Opens the login page and waits for it to load.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Fills the login form and submits it.
   * @param username - Username (string)
   * @param password - Password (string)
   * @returns this for chaining
   */
  async step_login(username: string, password: string): Promise<this> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButtonButton.click();
    return this;
  }

  // ── Verifies ───────────────────────────────────────────────────────────
  /**
   * Verifies the product catalog heading is visible.
   * @returns this for chaining
   */
  async verify_productPage(): Promise<this> {
    await this.productsHeading.waitFor({ state: 'visible' });
    await expect(this.productsHeading).toBeVisible();
    return this;
  }

  /**
   * Verifies the login page shows the locked-out error.
   * @returns this for chaining
   */
  async verify_lockedOutError(): Promise<this> {
    await this.errorDiv.waitFor({ state: 'visible' });
    await expect(this.errorDiv).toContainText(expected.lockedOutMessage);
    return this;
  }
}

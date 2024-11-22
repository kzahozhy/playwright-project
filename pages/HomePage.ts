import { expect, type Locator, type Page } from "@playwright/test";  

export const authProviders = {
  google: "Google",
  gitHub: "GitHub",
}

export class HomePage {
  private readonly page!: Page;

  readonly signUpButton: Locator;
  readonly loginWithGitHubButton: Locator;
  readonly gitHubEmailInput: Locator;
  readonly gitHubPasswordInput: Locator;
  readonly gitHubSignInButton: Locator;
  readonly gitHubAuthGlitchButton: Locator;
  readonly signUpWithGitHubButton: Locator;
  readonly authUserIcon: Locator;
  readonly signModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.locator('button[class*="sign-up-button"]');
    this.signModal = this.page.locator('div[class="modal-container"]');
    this.loginWithGitHubButton = this.signModal.locator('button[class*="github"]');
    this.gitHubEmailInput = this.page.locator('input#login_field');
    this.gitHubPasswordInput = this.page.locator('input#password');
    this.gitHubSignInButton = this.page.locator('input[type="submit"]');
    this.gitHubAuthGlitchButton = this.page.locator('button:has-text("Authorize glitchdotcom")');
    this.signUpWithGitHubButton = this.signModal.locator('button:has-text("Sign Up")');
    this.authUserIcon = this.page.locator("button#toggle-current-user")
  }

  async open() {
    await this.page.goto("/"); 
  }

  async signUpWith(authProvider: String) {
    await this.signUpButton.click();
    if(authProvider === authProviders.google) {
      await this.signUpWithGoogle();
    }
    else if(authProvider === authProviders.gitHub) {
      await this.signUpWithGitHub();
    }
    else {
      throw new Error(`Invalid auth provider: ${authProvider}`);
    }
  }

  async signUpWithGoogle() {
    //dummy method for demonstration purposes
  }

  async signUpWithGitHub() {
    await this.loginWithGitHubButton.click();
    await this.gitHubEmailInput.fill(process.env.GIT_HUB_USER_EMAIL!);
    await this.gitHubPasswordInput.fill(process.env.GIT_HUB_USER_PASSWORD!);
    await this.gitHubSignInButton.click(); 
    await this.gitHubAuthGlitchButton.click(); 
    await this.signUpWithGitHubButton.click();
  }

  async verifySignUpSuccessfull() {
    await expect(this.authUserIcon).toBeVisible();
    await expect(this.authUserIcon).toHaveAttribute('aria-label', `${process.env.GIT_HUB_USER_EMAIL!}'s account`);
  }
}
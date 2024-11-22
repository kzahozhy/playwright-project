import { test} from '@playwright/test';
import { HomePage } from "../pages/HomePage";
import { authProviders } from "../pages/HomePage";

test("Verify sign up to the app with GitHub",  async ({ page }) => {  
  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.signUpWith(authProviders.gitHub);
  await homePage.verifySignUpSuccessfull();
});
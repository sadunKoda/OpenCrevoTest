// spec: .crevoai/stories/login/login.story.md
import { test } from '@config/page.config';
import { loginExpected as expected } from '@config/page-loader';

test.describe('Codemify - Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.step_navigate();
  });

  // scenario: Valid credentials
  test('[AC-1] [TC-LOGIN-001] should open the product page', async ({ loginPage }) => {
    await loginPage.step_login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
    await loginPage.verify_productPage();
  });

  // scenario: Locked-out account
  test('[AC-2] [TC-LOGIN-002] should show the locked-out error', async ({ loginPage }) => {
    await loginPage.step_login(expected.lockedOutUsername, process.env.LOGIN_PASSWORD!);
    await loginPage.verify_lockedOutError();
  });

});

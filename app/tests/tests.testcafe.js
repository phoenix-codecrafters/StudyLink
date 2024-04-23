import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

// eslint-disable-next-line max-len
const userInfo = { email: 'test@foo.com', password: 'testme', firstname: 'will', lastname: 'testingson', image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/6588fe7d4bef9bfa00f705b1_Annoy-Squidward-Day.jpeg', classStanding: 'Freshman', major: 'Information and Computer Sciences (ICS)', description: 'I am a test' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, userInfo);
  await navBar.isLoggedIn(testController, userInfo.email);
});

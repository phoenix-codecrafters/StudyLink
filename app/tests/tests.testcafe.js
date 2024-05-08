import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { editProfilePage } from './editprofile.page';
import { leaderBoard } from './leaderboard.page';
import { aboutus } from './AboutUs.page';
import { rulesandreg } from './RulesandRegulations.page';
import { calendarPage } from './calendar.page';
import { addStudySession } from './studysession.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

// eslint-disable-next-line max-len
const userInfo = { email: 'test@foo.com', password: 'testme', firstname: 'will', lastname: 'testingson', image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/6588fe7d4bef9bfa00f705b1_Annoy-Squidward-Day.jpeg', classStanding: 'Freshman', major: 'Information and Computer Sciences (ICS)', description: 'I am a test' };

// eslint-disable-next-line max-len
const sessionInfo = { day: '1', month: '1', year: '2024', startTime: '12:00 PM', endTime: '2:00 PM', className: 'ICS 311', description: 'I need help with algorithms', ghAttend: ['john@foo.com', 'charlie@foo.com'], ssAttend: ['chad@foo.com'], owner: 'john@foo.com', isComplete: 'false', pointsAssign: 'false' };

// eslint-disable-next-line max-len
const userInfoChange = { firstname: 'notWill', lastname: 'Squilliumson', image: 'https://images.saymedia-content.com/.image/t_share/MTc2MjkyNDg2MzI1NDc4NTkw/pokemon-charizard-nicknames.png', classStanding: 'Sophomore', major: 'Information and Computer Sciences (ICS)', description: 'I am a changed test' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that About Us page displays', async (testController) => {
  await navBar.goToAboutUs(testController);
  await aboutus.isDisplayed(testController);
});

test('Test that Rules and Regulations page displays', async (testController) => {
  await navBar.goToRulesRegulations(testController);
  await rulesandreg.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that calendar page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToCalendar(testController);
  await calendarPage.isDisplayed(testController);
});

test('Test that leaderboard page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToLeaderboard(testController);
  await leaderBoard.isDisplayed(testController);
});

test.only('Test that edit profile works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToMyProfilePage(testController);
  await navBar.goToEditProfilePage(testController);
  await editProfilePage.changeProfileInfo(testController, userInfoChange);
  await navBar.goToMyProfilePage(testController);
});
test('Test that signup works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, userInfo);
  await navBar.isLoggedIn(testController, userInfo.email);
});

test('Test that Add Session works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.goToAddSessionPage(testController);
  await addStudySession.addSession(testController, sessionInfo);
});

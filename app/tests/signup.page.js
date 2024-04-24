import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
    this.emailInput = Selector('input[name="email"]');
    this.passwordInput = Selector('input[name="password"]');
    this.firstNameInput = Selector('input[name="firstname"]');
    this.lastNameInput = Selector('input[name="lastname"]');
    this.imageInput = Selector('input[name="image"]');
    this.majorSelect = Selector('select[name="major"]');
    this.classStandingSelect = Selector('select[name="classStanding"]');
    this.descriptionInput = Selector('textarea[name="description"]');
    this.registerButton = Selector('input[value="Register"]');
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async signupUser(testController, userData) {
    await this.isDisplayed(testController);
    await testController.typeText(this.emailInput, userData.email);
    await testController.typeText(this.passwordInput, userData.password);
    await testController.typeText(this.firstNameInput, userData.firstname);
    await testController.typeText(this.lastNameInput, userData.lastname);
    await testController.typeText(this.imageInput, userData.image);
    await testController.click(this.classStandingSelect);
    await testController.click(Selector('option').withText(userData.classStanding));
    await testController.click(this.majorSelect);
    await testController.click(Selector('option').withText(userData.major));
    await testController.typeText(this.descriptionInput, userData.description);
    await testController.click(this.registerButton);
    await navBar.isLoggedIn(testController, userData.email);
  }
}

export const signupPage = new SignupPage();

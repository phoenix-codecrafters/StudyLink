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
    this.courseNameInput = Selector('input[name="coursename"]');
    this.imageInput = Selector('input[name="image"]');
    this.majorInput = Selector('input[name="major"]');
    this.classStandingSelect = Selector('select[name="classStanding"]');
    // Add more selectors as needed
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async signupUser(testController, userData) {
    await this.isDisplayed(testController);
    await testController
      .typeText(this.emailInput, userData.email)
      .typeText(this.passwordInput, userData.password)
      .typeText(this.firstNameInput, userData.firstname)
      .typeText(this.lastNameInput, userData.lastname)
      .typeText(this.courseNameInput, userData.coursename)
      .typeText(this.imageInput, userData.image)
      .typeText(this.majorInput, userData.major)
      .click(this.classStandingSelect)
      .click(Selector('option', { text: userData.classStanding }))
      .wait(1000) // Wait for 1 second before submitting the form
      .click(Selector('button').withText('Register')); // Adjust the selector to match your form's button

    await navBar.isLoggedIn(testController, userData.email);
  }
}

export const signupPage = new SignupPage();

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
    this.majorSelect = Selector('select[name="major"]');
    this.classStandingSelect = Selector('select[name="classStanding"]');
    this.subjectInput = Selector('input[name="subject"]');
    this.descriptionInput = Selector('textarea[name="description"]');
    this.tutorYesRadio = Selector('input#tutor-yes[type="radio"]');
    this.tutorNoRadio = Selector('input#tutor-no[type="radio"]');
    this.registerButton = Selector('button').withText('Register');
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
      .click(this.majorSelect)
      .click(Selector('option').withText(userData.major))
      .click(this.classStandingSelect)
      .click(Selector('option').withText(userData.classStanding))
      .typeText(this.subjectInput, userData.subject)
      .typeText(this.descriptionInput, userData.description)
      .click(userData.tutor ? this.tutorYesRadio : this.tutorNoRadio)
      .click(this.registerButton);

    await navBar.isLoggedIn(testController, userData.email);
  }
}

export const signupPage = new SignupPage();

import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#editprofile-page';
    this.pageSelector = Selector(this.pageId);
    this.firstNameInput = Selector('input[name="firstname"]');
    this.lastNameInput = Selector('input[name="lastname"]');
    this.imageInput = Selector('input[name="image"]');
    this.majorSelect = Selector('select[name="major"]');
    this.classStandingSelect = Selector('select[name="classStanding"]');
    this.descriptionInput = Selector('textarea[name="description"]');
    this.registerButton = Selector('input[value="Submit"]');
    this.confirmButton = Selector('.swal-button');
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async changeProfileInfo(testController, userInfoChange) {
    await testController.typeText(this.firstNameInput, userInfoChange.firstname, { replace: true });
    await testController.typeText(this.lastNameInput, userInfoChange.lastname, { replace: true });
    await testController.typeText(this.imageInput, userInfoChange.image, { replace: true });
    await testController.click(this.classStandingSelect);
    await testController.click(Selector('option').withText(userInfoChange.classStanding));
    await testController.click(this.majorSelect);
    await testController.click(Selector('option').withText(userInfoChange.major));
    await testController.typeText(this.descriptionInput, userInfoChange.description, { replace: true });
    await testController.click(this.registerButton);
    await testController.click(this.confirmButton);
  }
}

export const editProfilePage = new EditProfilePage();

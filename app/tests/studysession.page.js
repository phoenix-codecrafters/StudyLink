import { Selector } from 'testcafe';

class AddStudySessionPage {
  constructor() {
    this.pageId = '#add-session-page';
    this.pageSelector = Selector(this.pageId);
    this.daySelect = Selector('select[name="day"]');
    this.monthSelect = Selector('select[name="month"]');
    this.yearSelect = Selector('select[name="year"]');
    this.startTimeSelect = Selector('select[name="startTime"]');
    this.endTimeSelect = Selector('Select[name="endTime"]');
    this.classNameInput = Selector('input[name="className"]');
    this.studentTypeSelect = Selector('input[name="ssOgh"]').filter('[value="0"]');
    this.descriptionInput = Selector('textarea[name="description"]');
    this.submitButton = Selector('input[value="Submit"]');
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async addSession(testController, sessionData) {
    await this.isDisplayed(testController);
    await testController.click(this.daySelect);
    await testController.click(Selector('option').withText(sessionData.day));
    await testController.click(this.monthSelect);
    await testController.click(Selector(`select[name="month"] option[value="${sessionData.month}"]`));
    await testController.click(this.yearSelect);
    await testController.click(Selector('option').withText(sessionData.year));
    await testController.click(this.startTimeSelect);
    await testController.click(Selector('option').withText(sessionData.startTime));
    await testController.click(this.endTimeSelect);
    await testController.click(Selector(`select[name="endTime"] option[value="${sessionData.endTime}"]`));
    await testController.typeText(this.classNameInput, sessionData.className);
    await testController.click(this.studentTypeSelect);
    await testController.typeText(this.descriptionInput, sessionData.description);
    await testController.click('Submit');
  }
}

export const addStudySession = new AddStudySessionPage();

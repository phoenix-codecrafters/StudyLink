import { Selector } from 'testcafe';

class CalendarPage {
  constructor() {
    this.pageId = '#white-box';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const calendarPage = new CalendarPage();

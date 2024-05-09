import { Selector } from 'testcafe';

class OwnedSessionsPage {
  constructor() {
    this.pageId = '#my-sessions';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const mySessions = new OwnedSessionsPage();

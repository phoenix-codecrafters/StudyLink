import { Selector } from 'testcafe';

class RulesAndRegulations {
  constructor() {
    this.pageId = '#rules-and-reg';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const rulesandreg = new RulesAndRegulations();

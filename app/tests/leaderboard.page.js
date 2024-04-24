import { Selector } from 'testcafe';

class LeaderBoard {
  constructor() {
    this.pageId = '#leaderboard-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const leaderBoard = new LeaderBoard();

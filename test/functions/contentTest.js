// NOT IN USE

import { getSwitchElement, testTodayPostsRemoved } from './popup.js';
import {
  login,
  testPostsAreFiltered,
  testPostsAreShown,
  feedLoaded,
} from './content.js';

export const contentTest = (accountType) => {
  describe(`content test with ${accountType} account`, () => {
    let driver;
    beforeAll(async () => {
      driver = global.driver;
      await driver.goPage('https://linkedin.com');
      await login(driver, accountType);
      await feedLoaded(driver);
    });

    describe('with default filters', () => {
      testPostsAreFiltered(true, true);

      // check that not all posts have been filtered
      testPostsAreShown();
    });

    describe('deactivate reactions filter', () => {
      beforeAll(async () => {
        await driver.goExtensionPage('popup');
        await getSwitchElement('reactions').click();
        await driver.goPage('https://linkedin.com');
        await feedLoaded(driver);
      });

      testPostsAreFiltered(false, true);
    });

    describe('get posts filtered number', () => {
      beforeAll(async () => {
        await driver.goExtensionPage('popup');
      });
      testTodayPostsRemoved();
      afterAll(async () => {
        await driver.navigate().back();
      });
    });
  });
};

/* NOTE--
won't test features that are already covered in other tests
e.g. how posts removed today -> total which is covered in popup
*/

import {
  testTodayDate,
  changePostsRemovedToday,
  changeTodayDate,
  updateStorageShown,
  testPostsRemoved,
} from './functions/storage.js';

describe('background test', () => {
  let driver;
  beforeAll(async () => {
    driver = global.driver;
    await driver.goExtensionPage('test');
  });

  describe('initialisation', () => {
    testTodayDate(new Date());
  });

  describe('change posts today', () => {
    beforeAll(async () => {
      await changePostsRemovedToday(driver, 30);
      await changeTodayDate(driver, new Date(2019, 0, 3));
      await updateStorageShown(driver);
    });

    testPostsRemoved(0, 30);
  });

  describe('change today->posts today->refresh', () => {
    beforeAll(async () => {
      await changeTodayDate(driver, new Date(2019, 0, 3));
      await changePostsRemovedToday(driver, 20);
      await driver.goExtensionPage('background');
      await driver.navigate().refresh();
      await driver.navigate().back();
    });

    testTodayDate(new Date());

    // must take into consideration posts today set in previous describe
    testPostsRemoved(0, 50);
  });
});

import {
  testSwitchStates,
  testSwitchHover,
  testStats,
  getSwitchElement,
} from './functions/popup.js';
import {
  testFilterStorage,
  changePostsRemovedToday,
} from './functions/storage.js';

describe('popup test', () => {
  let driver;
  beforeAll(async () => {
    driver = global.driver;
    await driver.goExtensionPage('popup');
  });

  describe('initialisation', () => {
    testSwitchStates(true, true);
    testSwitchHover();
    testStats(0, 0);
  });
  describe('change switch', () => {
    beforeAll(async () => {
      await getSwitchElement('reactions').click();
    });

    testSwitchStates(false, true);

    describe('go test page to check filter storage', () => {
      beforeAll(async () => {
        await driver.goExtensionPage('test');
      });

      testFilterStorage(false, true);

      afterAll(async () => {
        await driver.navigate().back();
      });
    });
  });

  describe('go test page to increase posts removed today then come back to test changes', () => {
    beforeAll(async () => {
      await driver.goExtensionPage('test');
      await changePostsRemovedToday(driver, 999);
      await driver.navigate().back();
    });

    testStats(999, 999);
  });
});

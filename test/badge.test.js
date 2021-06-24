import { changePostsRemovedToday } from './functions/storage.js';
import {
  testBadgeBgColor,
  testBadgeText,
  updateBadgeOutput,
} from './functions/badge.js';

describe('badge test', () => {
  let driver;
  beforeAll(async () => {
    driver = global.driver;
    await driver.goExtensionPage('test');
  });

  describe('initialisation', () => {
    testBadgeBgColor();
    testBadgeText('');
  });

  describe('increase storage posts today', () => {
    beforeAll(async () => {
      await changePostsRemovedToday(driver, 999);
      await updateBadgeOutput(driver);
    });
    testBadgeBgColor();
    testBadgeText('999');
  });

  describe('reset storage posts today', () => {
    beforeAll(async () => {
      await changePostsRemovedToday(driver, 0);
      await updateBadgeOutput(driver);
    });
    testBadgeBgColor();
    testBadgeText('');
  });
});

// NOT IN USE

import { By, until } from 'selenium-webdriver';
import { JSDOM } from 'jsdom';
import {
  postsSelector,
  postInFilter,
} from '../../../src/pages/Content/modules/helpers.js';
import settings from '../../../utils/settings.js';

let driver;

beforeAll(async () => {
  driver = global.driver;
});

export const login = async (driver, accountType = 'premium') => {
  // used to log in credentials, not working anymore
  const loginCredentials = '';

  const emailInput = await driver.findElement(
    By.css(".sign-in-form input[autocomplete='username']")
  );
  await emailInput.sendKeys('');

  const passwordInput = await driver.findElement(
    By.css(".sign-in-form input[autocomplete='current-password']")
  );
  passwordInput.sendKeys('');

  const submitButton = await driver.findElement(
    By.css(".sign-in-form button[type='submit']")
  );
  await submitButton.click();
};

export const testPostsAreFiltered = (reactions, promoted) => {
  test('test posts are filtered', async () => {
    const postsContainer = await driver
      .findElement(By.css('main'))
      .getAttribute('outerHTML');

    const posts = Array.from(
      new JSDOM(postsContainer).window.document.querySelectorAll(postsSelector)
    );

    const postsMissedByFilter = posts.some((post) =>
      postInFilter(post, reactions, promoted)
    );

    expect(postsMissedByFilter).toBe(false);
  });
};

export const testPostsAreShown = () => {
  test('test that not all posts have been deleted', async () => {
    const posts = await driver.findElements(By.css(postsSelector));
    expect(posts.length).toBeGreaterThan(0);
  });
};

// waits until 3 posts are loaded
export const feedLoaded = async (driver) => {
  const condition = until.elementLocated(
    By.css(postsSelector + ':nth-of-type(1)')
  );

  await driver.wait(
    async (driver) => condition.fn(driver),
    10000,
    'Waiting failed'
  );
};

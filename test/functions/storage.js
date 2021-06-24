import { By } from 'selenium-webdriver';
import { dateToInputValue } from '../../src/pages/Background/modules/helpers.js';

let driver;

beforeAll(() => {
  driver = global.driver;
});

export const testFilterStorage = (reactionsInput, promotedInput) => {
  test('test filter storage', async () => {
    const reactionsStorageText = await driver
      .findElement(By.id('reactions'))
      .getText();
    expect(reactionsStorageText === 'true').toBe(reactionsInput);

    const promotedStorageText = await driver
      .findElement(By.id('promoted'))
      .getText();
    expect(promotedStorageText === 'true').toBe(promotedInput);
  });
};

export const changePostsRemovedToday = async (driver, newPostsRemovedToday) => {
  let postsTodayInput = await driver.findElement(
    By.css('#storage #change-posts-today input')
  );

  await postsTodayInput.clear();

  await postsTodayInput.sendKeys(newPostsRemovedToday);

  await driver
    .findElement(By.css('#storage #change-posts-today button'))
    .click();
};

export const testTodayDate = (todayDateInputObj) => {
  test('test today date storage', async () => {
    const todayDateInputValue = dateToInputValue(todayDateInputObj);

    const todayDateStorage = await driver
      .findElement(By.id('storageTodayDate'))
      .getText();

    expect(todayDateInputValue).toBe(JSON.parse(todayDateStorage));
  });
};

export const changeTodayDate = async (driver, newTodayDateObj) => {
  let todayDateInput = await driver.findElement(
    By.css('#change-today-date input')
  );
  await todayDateInput.clear();

  const newTodayDateInput = newTodayDateObj.toLocaleString();
  await todayDateInput.sendKeys(newTodayDateInput);
  await driver.findElement(By.css('#change-today-date button')).click();
};

export const updateStorageShown = async (driver) => {
  await driver.findElement(By.id('update-storage')).click();
};

export const testPostsRemoved = (todayInput, totalInput) => {
  test('tests posts removed', async () => {
    const todayShownText = await driver
      .findElement(By.id('postsRemovedToday'))
      .getText();
    expect(todayInput).toBe(parseInt(todayShownText));

    const totalShownText = await driver
      .findElement(By.id('postsRemovedUntilYtd'))
      .getText();
    expect(totalInput).toBe(
      parseInt(totalShownText) + parseInt(todayShownText)
    );
  });
};

import { By } from 'selenium-webdriver';

let driver;

beforeAll(() => {
  driver = global.driver;
});

export const updateBadgeOutput = async (driver) => {
  await driver.findElement(By.id('refresh-badge-data')).click();
};

export const testBadgeBgColor = () => {
  test('test badge background color', async () => {
    const badgeBgColor = await driver
      .findElement(By.id('badge-background'))
      .getText();
    expect(badgeBgColor).toBe('[39,45,45,255]');
  });
};

export const testBadgeText = (expectedValue) => {
  test('test badge text', async () => {
    const badgeText = await driver.findElement(By.id('badge-text')).getText();
    expect(badgeText).toBe(expectedValue);
  });
};

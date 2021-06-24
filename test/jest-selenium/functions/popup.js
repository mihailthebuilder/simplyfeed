import { By } from 'selenium-webdriver';

let driver;

beforeAll(() => {
  driver = global.driver;
});

export const getSwitchElement = (switchType) => {
  return driver.findElement(
    By.css(
      `.MuiFormControlLabel-root:nth-of-type(${
        switchType === 'reactions' ? 1 : 2
      }) .MuiButtonBase-root`
    )
  );
};

export const testSwitchStates = (reactionsInputActive, promotedInputActive) => {
  test('test switch states', async () => {
    const reactionsSwitchClass = await getSwitchElement(
      'reactions'
    ).getAttribute('class');
    const promotedSwitchClass = await getSwitchElement('promoted').getAttribute(
      'class'
    );

    const switchActiveStates = [
      reactionsSwitchClass,
      promotedSwitchClass,
    ].map((className) => className.includes('Mui-checked'));

    expect(switchActiveStates).toStrictEqual([
      reactionsInputActive,
      promotedInputActive,
    ]);
  });
};

export const testSwitchHover = () => {
  test('test switch hover', async () => {
    // move cursor to center of the first switch element
    const switchElement = await driver.findElement(
      By.className('MuiFormControlLabel-root')
    );
    const actions = driver.actions({ async: true });
    await actions.move({ origin: switchElement }).perform();

    const isTooltipVisible = await driver
      .findElement(By.css("div[role='tooltip']"))
      .isDisplayed();

    expect(isTooltipVisible).toBe(true);
  });
};

export const testStats = (todayStatInput, totalStatInput) => {
  test('test stats', async () => {
    const statElements = await driver.findElements(By.className('statNumber'));
    const todayStatText = await statElements[0].getText();
    const totalStatText = await statElements[1].getText();

    const stats = [todayStatText, totalStatText].map((text) => parseInt(text));
    expect(stats).toStrictEqual([todayStatInput, totalStatInput]);
  });
};

export const testTodayPostsRemoved = () => {
  test('test some posts removed today', async () => {
    const todayStatText = await driver
      .findElement(By.className('statNumber'))
      .getText();
    expect(parseInt(todayStatText)).toBeGreaterThan(0);
  });
};

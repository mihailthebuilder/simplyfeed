/* sources of inspiration: 
https://jestjs.io/docs/configuration
https://github.com/alexeyraspopov/jest-webdriver/blob/master/packages/jest-environment-webdriver/modules/WebDriverEnvironment.js
https://github.com/applitools/jest-environment-selenium/blob/master/src/index.js
*/

// my-custom-environment
const TemplateEnvironment = require('./templateEnvironment.js');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const settings = require('./settings.js');

const createChromeDriver = async () => {
  // specify the extension to load
  let options = new chrome.Options();
  const extensionPath = require('path').join(__dirname, '../../build');
  options.addArguments('--load-extension=' + extensionPath);
  options.addArguments('--verbose');

  let builder = await new Builder()
    .setChromeOptions(options)
    .forBrowser('chrome')
    .usingServer('http://chrome:4444')
    .build();

  return builder;
};

class ChromeEnvironment extends TemplateEnvironment {
  async setup() {
    await super.setup();

    let driver = await createChromeDriver();

    // TODO - consider removing timeout
    await driver.manage().setTimeouts({ implicit: 120000 });

    await driver.get('chrome://extensions/');

    const extensionId = await driver
      .findElement(By.id('extension-id'))
      .getText();

    // set up page navigation handlers
    driver.goPage = async (url) => {
      await driver.get(url);
    };
    driver.goExtensionPage = async (pageName) => {
      const internalUrl = `chrome-extension://${extensionId}/`;
      await driver.get(internalUrl + pageName + '.html');
    };

    this.global.driver = driver;
  }
}

module.exports = ChromeEnvironment;

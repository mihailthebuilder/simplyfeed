// NOT IN USE

/* sources of inspiration: 
https://jestjs.io/docs/configuration
https://github.com/alexeyraspopov/jest-webdriver/blob/master/packages/jest-environment-webdriver/modules/WebDriverEnvironment.js
https://github.com/applitools/jest-environment-selenium/blob/master/src/index.js
*/

// my-custom-environment
const TemplateEnvironment = require('./templateEnvironment.js');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const settings = require('../../../utils/settings.js');

const createFirefoxDriver = async () => {
  // specify the extension to load
  let options = new firefox.Options();

  const extensionPath = require('path').join(
    __dirname,
    '../../../web-ext-artifacts/simplyfeed_-_linkedin_feed_filter-0.0.0.3.zip'
  );
  options.addExtensions(extensionPath);

  const { binary, profile, internalExtensionId } =
    settings.environments.firefox;

  // need to use firefox dev edition to load unsigned extension
  options.setBinary(binary);
  // need to use custom profile where xpinstall
  options.setProfile(profile);

  let builder = await new Builder()
    .setFirefoxOptions(options)
    .forBrowser('firefox')
    .build();

  return builder;
};

class FirefoxEnvironment extends TemplateEnvironment {
  async setup() {
    await super.setup();

    let driver = await createFirefoxDriver();
    await driver.manage().setTimeouts({ implicit: 120000 });

    // set up page navigation handlers
    driver.goPage = async (url) => {
      await driver.get(url);
    };
    driver.goExtensionPage = async (pageName) => {
      const internalUrl = `moz-extension://${extensionUrl}/`;
      await driver.get(internalUrl + pageName + '.html');
    };

    this.global.driver = driver;
  }
}

module.exports = FirefoxEnvironment;

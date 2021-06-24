/* sources of inspiration: 
https://jestjs.io/docs/configuration
https://github.com/alexeyraspopov/jest-webdriver/blob/master/packages/jest-environment-webdriver/modules/WebDriverEnvironment.js
https://github.com/applitools/jest-environment-selenium/blob/master/src/index.js
*/

// my-custom-environment
const NodeEnvironment = require('jest-environment-node');

class TemplateEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    // the global.driver is initialised here in the chrome/firefoxEnv
  }
  async teardown() {
    if (this.global.driver) {
      await this.global.driver.quit();
    }

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = TemplateEnvironment;

module.exports = {
  projects: [
    {
      displayName: 'chrome',
      testEnvironment: './test/setup/chromeEnvironment.js',
      slowTestThreshold: 100,
    },
    /* not working anymore
    {
      displayName: 'firefox',
      testEnvironment: './test/jest-selenium/setup/firefoxEnvironment.js',
      slowTestThreshold: 100,
    },*/
  ],
  testTimeout: 120000,
};

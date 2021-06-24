const fs = require('fs');

const settingsPath = './test/jest-selenium/setup/environmentSettings.json';
const rawData = fs.readFileSync(settingsPath);
const settings = JSON.parse(rawData);

module.exports = settings;

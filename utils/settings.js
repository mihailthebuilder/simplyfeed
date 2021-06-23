const fs = require('fs');

const settingsPath = "../private/simplyfeed/settings.json";
const rawData = fs.readFileSync(settingsPath);
const settings = JSON.parse(rawData);

module.exports = settings;

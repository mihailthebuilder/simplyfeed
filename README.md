# SimplyFeed

Browser extension that filters liked and promoted posts in your LinkedIn feed. Available for download from the [Chrome Web Store](https://chrome.google.com/webstore/detail/simplyfeed-linkedin-feed/hpjgkdecioodgjhhdoagefbbdlljkpic) and [Firefox Browser Add-Ons](https://addons.mozilla.org/en-GB/firefox/addon/simplyfeed-linkedin-filter/).

# Table of contents

- [SimplyFeed](#simplyfeed)
- [Table of contents](#table-of-contents)
- [Features](#features)
- [Setting up the development environment](#setting-up-the-development-environment)
- [Developing locally](#developing-locally)
- [Other](#other)
- [To do](#to-do)
  - [Firefox tests](#firefox-tests)
  - [Content script test](#content-script-test)

# Features

# Setting up the development environment

Run `npm install`

# Developing locally

Follow these steps if you want to

1. Run `npm install` (only the first time you create the extension locally).
2. Run `NODE_ENV=production npm run build` to create the build files.
3. Run `npm run firefox:build` to archive it with the [web-ext](https://www.npmjs.com/package/web-ext) package.

# Other

mention tests

# To do

## Firefox tests

I previously managed to automate the testing of the extension with Firefox. The tests don't work anymore, I think it has something to do with a recent Firefox update. Here's the steps I took to make it work in the past:

1. Install `geckodriver`.
2. Install [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) using [this guide](https://medium.com/@js_debugger/how-to-install-firefox-developer-edition-on-ubuntu-1c7f5f2b6883). If you don't follow the guide, make sure you set `options.setProfile` in [firefoxEnvironment.js](test/jest-selenium/setup/firefoxEnvironment.js) to the path for Firefox Developer Edition's executable.
3. Disable signature checking for add-ons in the Firefox Developer Edition installation. [Here's](https://stackoverflow.com/a/31952728) how you do it.
4. Update the following values in [firefoxEnvironment.js](test/jest-selenium/setup/firefoxEnvironment.js)...
   1. `internalExtensionId` - see how it was done for Chrome
   2. `options.setBinary` - location of the Firefox Developer Edition executable
   3. `options.setProfile` - the folder name in `~/.mozilla/firefox` that ends in `.dev-edition-default`. This folder holds the default profile for your Firefox Developer Edition Installation.
5. Add this key/value pair to the first-level object `manifest.json` when developing locally:
   ```
   {
      "browser_specific_settings": {
        "gecko": {
          "id": "addon@example.com",
          "strict_min_version": "42.0"
        }
      }
   }
   ```
6. Uncomment the Firefox-related key-value pair in [jest.config.js](jest.config.js)

## Content script test

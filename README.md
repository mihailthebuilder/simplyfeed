# SimplyFeed

Browser extension that filters liked and promoted posts in your LinkedIn feed. Available for download from the [Chrome Web Store](https://chrome.google.com/webstore/detail/simplyfeed-linkedin-feed/hpjgkdecioodgjhhdoagefbbdlljkpic) and [Firefox Browser Add-Ons](https://addons.mozilla.org/en-GB/firefox/addon/simplyfeed-linkedin-filter/).

# Table of contents

- [SimplyFeed](#simplyfeed)
- [Table of contents](#table-of-contents)
- [Features](#features)
- [Setting up the development environment](#setting-up-the-development-environment)
- [Developing locally](#developing-locally)
- [To do](#to-do)
  - [Firefox tests](#firefox-tests)
  - [Content script test](#content-script-test)
    - [Sourcing the content that's tested](#sourcing-the-content-thats-tested)
- [Other](#other)

# Features

# Setting up the development environment

Run `npm install`

# Developing locally

Follow these steps if you want to

1. Run `npm install` (only the first time you create the extension locally).
2. Run `NODE_ENV=production npm run build` to create the build files.
3. Run `npm run firefox:build` to archive it with the [web-ext](https://www.npmjs.com/package/web-ext) package.

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

The `content.js` and `contentTest.js` scripts refer to several automated tests I previously set up for the content scripts which are applied on the LinkedIn website. However, I encountered several challenges.

### Sourcing the content that's tested

# Other

This is separate from the original version because had sensitive info.

Might be sometimes out of sync with what's in the Chrome Web Store / Firefox Add-ons. This will happen when I make changes that don't have bearing to the extension's functionality (e.g. tests) and I can't be bothered to go through the process of updating the extension listings.

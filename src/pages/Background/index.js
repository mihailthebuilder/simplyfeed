import '../../assets/img/active-16.png';
import '../../assets/img/active-32.png';
import '../../assets/img/active-64.png';
import '../../assets/img/active-128.png';
import {
  storageInit,
  badgeBgColorInit,
  listenLinkedinPage,
  listenStorageChanges,
  setUninstallURL,
} from './modules/helpers.js';
import { trackEvent, checkDayChanged } from './modules/helpers.js';

// works every time you install/update the extension
chrome.runtime.onInstalled.addListener(() => {
  trackEvent('extensionInstalled');

  storageInit();

  setUninstallURL();
});

badgeBgColorInit();

listenLinkedinPage();

listenStorageChanges();

checkDayChanged();

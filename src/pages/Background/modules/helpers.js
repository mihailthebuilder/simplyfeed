import _ from 'lodash';

export const dateToInputValue = (dateObj) => dateObj.toISOString().slice(0, 10);

export const storageItemsDefaults = {
  reactions: true,
  promoted: true,
  storageTodayDate: dateToInputValue(new Date()),
  postsRemovedToday: 0,
  postsRemovedUntilYtd: 0,
};

export const storageInit = () => {
  chrome.storage.local.set(storageItemsDefaults);
};

export const badgeBgColorInit = () => {
  chrome.browserAction.setBadgeBackgroundColor({ color: '#272d2d' });
};

export const listenLinkedinPage = () => {
  chrome.webNavigation.onHistoryStateUpdated.addListener(
    function () {
      console.log('BG-linkedin identified');

      trackEvent('linkedinActivated');

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const lastTabId = tabs[0].id;
        chrome.tabs.sendMessage(lastTabId, 'Background page started.');
      });
    },
    { url: [{ urlMatches: 'linkedin.com/feed' }] }
  );
};

export const listenStorageChanges = () => {
  chrome.storage.onChanged.addListener(function (changes) {
    // update badge text
    const newPostsRemovedToday = changes?.postsRemovedToday?.newValue;
    if (!_.isNil(newPostsRemovedToday)) {
      console.log('changing badge text');
      chrome.browserAction.setBadgeText({
        text: newPostsRemovedToday === 0 ? '' : newPostsRemovedToday.toString(),
      });
    }

    // reset postsRemovedToday when new day
    const newStorageTodayDate = changes?.storageTodayDate?.newValue;
    if (!_.isNil(newStorageTodayDate)) {
      console.log("BG-reset today's removed posts and add to total.");
      chrome.storage.local.get(
        ['postsRemovedUntilYtd', 'postsRemovedToday'],
        ({ postsRemovedUntilYtd, postsRemovedToday }) => {
          chrome.storage.local.set({
            postsRemovedUntilYtd: postsRemovedUntilYtd + postsRemovedToday,
            postsRemovedToday: 0,
          });
        }
      );
    }

    for (const key in changes) {
      const storageChange = changes[key];
      console.log(
        `Storage key "${key}" changed. ` +
          `Old value was "${storageChange.oldValue}", ` +
          `new value is "${storageChange.newValue}"`
      );
    }
  });
};

export const setUninstallURL = () => {
  chrome.runtime.setUninstallURL('https://forms.gle/tkLmUUVkoZxGSH9T7', () => {
    trackEvent('extensionRemoved');
  });
};

export const trackEvent = (eventName) => {
  // eslint-disable-next-line no-undef
  _gaq.push(['_trackEvent', eventName, 'true']);
};

export const checkDayChanged = () => {
  console.log('checking day change');
  // reset today's removed posts every day
  chrome.storage.local.get(['storageTodayDate'], ({ storageTodayDate }) => {
    const newTodayDate = dateToInputValue(new Date());

    if (newTodayDate !== storageTodayDate) {
      chrome.storage.local.set({ storageTodayDate: newTodayDate });
    }
  });
};

import { removePosts } from './modules/helpers.js';

const launch = ({ reactions, promoted }) => {
  console.log('CS-', 'reactions', reactions, 'promoted', promoted);
  const observer = new MutationObserver(() => removePosts(reactions, promoted));

  const observerOptions = {
    childList: true,
    subtree: true,
    characterData: true,
  };

  observer.observe(document.body, observerOptions);
};

chrome.storage.local.get(['reactions', 'promoted'], function (result) {
  launch(result);
});

chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
  chrome.storage.local.get(['reactions', 'promoted'], function (result) {
    launch(result);
  });

  console.log('CS-Got message from background page: ' + msg);
});

import _ from 'lodash';

export const postsSelector = '[data-id]';

export const getAllPosts = () => document.querySelectorAll(postsSelector);

export const removePosts = (reactions, promoted) => {
  let deletedPosts = false;

  getAllPosts().forEach((post) => {
    if (postInFilter(post, reactions, promoted)) {
      console.log('removed post below...');
      console.log(post.innerText);
      post.remove();
      deletedPosts = true;

      chrome.storage.local.get(
        ['postsRemovedToday'],
        ({ postsRemovedToday }) => {
          chrome.storage.local.set({
            postsRemovedToday: postsRemovedToday + 1,
          });
        }
      );
    }
  });

  if (deletedPosts && getAllPosts().length === 0) {
    const footer = document.querySelector('footer');
    const shareBox = document.querySelector('.share-box-feed-entry__wrapper');

    if (!_.isNil(footer) && !_.isNil(shareBox)) {
      console.log('no posts to show in feed, scrolling to refresh...');
      document.querySelector('footer').scrollIntoView();
      document.querySelector('.share-box-feed-entry__wrapper').scrollIntoView();
      console.log('...finished scrolling.');
    }
  }
};

const isReaction = (post) => {
  const postHeader = post.querySelector('.feed-shared-header');

  if (postHeader === null) return false;

  // use plural of verbs for cases where multiple people in your network reacted to the post
  const regex = new RegExp('like|celebrate|love|support|insightful|curious');

  return regex.test(postHeader.innerText);
};

const isPromoted = (post) => {
  const postHeader = post.querySelector(`[data-control-name='actor']`);
  if (postHeader === null) return false;

  const regex = new RegExp('Promoted');

  return regex.test(postHeader.innerText);
};

export const postInFilter = (post, reactions, promoted) =>
  (reactions && isReaction(post)) || (promoted && isPromoted(post));

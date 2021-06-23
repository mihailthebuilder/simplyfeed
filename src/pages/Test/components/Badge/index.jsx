import React from 'react';
import { useState, useEffect } from 'react';

const Badge = () => {
  const [badgeText, setBadgeText] = useState('');
  const [badgeBackgroundColor, setBadgeBackgroundColor] = useState('');

  const updateBadgeData = () => {
    chrome.browserAction.getBadgeText({}, (result) => {
      setBadgeText(result);
    });
    chrome.browserAction.getBadgeBackgroundColor({}, (result) => {
      setBadgeBackgroundColor(JSON.stringify(result));
    });
  };

  useEffect(() => {
    updateBadgeData();
  }, []);

  return (
    <section id="badge">
      <button type="button" id="refresh-badge-data" onClick={updateBadgeData}>
        Refresh badge data
      </button>
      <div id="badge-background">{badgeBackgroundColor}</div>
      <div id="badge-text">{badgeText}</div>
    </section>
  );
};

export default Badge;

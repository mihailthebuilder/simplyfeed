import React from 'react';
import { useState, useEffect } from 'react';

import './index.scss';

const BlockedPostStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    chrome.storage.local.get(
      ['postsRemovedToday', 'postsRemovedUntilYtd'],
      ({ postsRemovedToday, postsRemovedUntilYtd }) => {
        setStats({
          postsRemovedToday,
          postsRemovedUntilYtd: postsRemovedToday + postsRemovedUntilYtd,
        });
      }
    );
  }, []);

  return (
    Object.keys(stats).length !== 0 && (
      <div className="blocked-posts-container">
        <div>
          Today:{' '}
          <b className="statNumber">
            {stats.postsRemovedToday.toLocaleString()}
          </b>
        </div>
        <div>
          Total:{' '}
          <b className="statNumber">
            {stats.postsRemovedUntilYtd.toLocaleString()}
          </b>
        </div>
      </div>
    )
  );
};

export default BlockedPostStats;

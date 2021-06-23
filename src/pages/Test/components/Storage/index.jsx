import React from 'react';
import { useState, useEffect } from 'react';
import { storageItemsDefaults } from '../../../Background/modules/helpers.js';

const Storage = () => {
  const [storageStates, setStorageStates] = useState({});
  const [postsTodayInput, setPostsTodayInput] = useState(0);
  const [todayDateInput, setTodayDateInput] = useState('');

  useEffect(() => {
    updateStorageDataShown();
  }, []);

  const changeToday = () => {
    chrome.storage.local.set({ storageTodayDate: todayDateInput });
  };

  const changePostsTodayInput = (event) => {
    setPostsTodayInput(parseInt(event.target.value));
  };

  const changePostsTodayStorage = () => {
    chrome.storage.local.set({ postsRemovedToday: postsTodayInput });
  };

  const updateStorageDataShown = () => {
    chrome.storage.local.get(Object.keys(storageItemsDefaults), (result) => {
      setStorageStates(result);
    });
  };

  const changeTodayInput = (event) => {
    setTodayDateInput(event.target.value);
  };

  return (
    <section id="storage">
      <button
        type="button"
        id="update-storage"
        onClick={updateStorageDataShown}
      >
        Update storage data shown
      </button>

      {Object.entries(storageStates).map(([key, value]) => (
        <div id={key} key={key}>
          {JSON.stringify(value)}
        </div>
      ))}

      <div id="change-posts-today">
        <input
          type="number"
          onChange={changePostsTodayInput}
          value={postsTodayInput}
        />
        <button type="button" onClick={changePostsTodayStorage}>
          Change storage posts removed today in storage
        </button>
      </div>
      <div id="change-today-date">
        <input type="date" onChange={changeTodayInput} value={todayDateInput} />
        <button type="button" onClick={changeToday}>
          Change storage today
        </button>
      </div>
    </section>
  );
};

export default Storage;

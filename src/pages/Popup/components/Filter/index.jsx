import React from 'react';
import { useState, useEffect } from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Tooltip from '@material-ui/core/Tooltip';

import './index.scss';

const filterText = {
  reactions: {
    label: 'Reactions',
    hint:
      "Removes posts that arrived into your feed because someone in your network 'reacted' to it (e.g. likes, loves, applauds).",
  },
  promoted: {
    label: 'Promoted',
    hint:
      'Removes posts that came into your feed because someone paid for LinkedIn marketing.',
  },
};

const Filter = ({ filterKey }) => {
  const [filterState, setFilterState] = useState(null);

  useEffect(() => {
    chrome.storage.local.get([filterKey], (result) => {
      setFilterState(result[filterKey]);
    });
  }, [filterKey]);

  const handleChange = (event) => {
    setFilterState(event.target.checked);
  };

  useEffect(() => {
    chrome.storage.local.set({ [filterKey]: filterState });
  }, [filterState, filterKey]);

  return (
    filterState !== null && (
      <Tooltip title={filterText[filterKey].hint}>
        <FormControlLabel
          control={
            <Switch
              checked={filterState}
              onChange={handleChange}
              name={filterKey}
              color="primary"
            />
          }
          label={filterText[filterKey].label}
        />
      </Tooltip>
    )
  );
};

export default Filter;

import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';

import Header from './components/Header';
import Section from './components/Section';
import Filter from './components/Filter';
import BlockedPostStats from './components/BlockedPostStats';

import './Popup.scss';

const Popup = () => {
  return (
    <div className="App">
      <Header />
      <Section sectionId="filters" heading="Filters">
        <FormGroup row className="switch-container">
          <Filter filterKey="reactions" />
          <Filter filterKey="promoted" />
        </FormGroup>
      </Section>

      <Section sectionId="blocked-posts" heading="Blocked posts">
        <BlockedPostStats />
      </Section>

      <small>
        <i>
          Hover over filter to see its definition. Refresh page once changes
          applied.
        </i>
      </small>
    </div>
  );
};

export default Popup;

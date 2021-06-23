import React from 'react';
import './index.scss';
import logo from './active-128.png';

const Header = () => {
  return (
    <header className="App-header">
      <div className="App-title">
        <h1>SimplyFeed LinkedIn Filter</h1>{' '}
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <p>
        A project by{' '}
        <a
          href="https://www.linkedin.com/in/mihailmarian/"
          target="_blank"
          rel="noreferrer"
        >
          Mihail Marian
        </a>
      </p>
    </header>
  );
};

export default Header;

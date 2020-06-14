import React from 'react';

import './TopNav.scss';

const TopNav = () => {
  return (
    <div className="TopNav">
      <div className="thenewboston">
        <img alt="thenewboston logo" className="logo" src={require('@renderer/assets/logo.png')} />
        <span>thenewboston</span>
      </div>
      <div className="navigation-icons">
        <span className="material-icons">arrow_back</span>
        <span className="material-icons">arrow_forward</span>
      </div>
    </div>
  );
};

export default TopNav;

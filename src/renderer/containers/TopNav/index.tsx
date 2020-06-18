import React from 'react';

import TnbLogo from '@renderer/components/TnbLogo';

import './TopNav.scss';

const TopNav = () => {
  return (
    <div className="TopNav">
      <div className="thenewboston">
        <TnbLogo />
        <h2>thenewboston</h2>
      </div>
      <div className="navigation-icons">
        <span className="material-icons">arrow_back</span>
        <span className="material-icons">arrow_forward</span>
      </div>
    </div>
  );
};

export default TopNav;

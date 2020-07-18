import React from 'react';

import Logo from '@renderer/components/Logo';

import './TopNav.scss';
import Icon from '@renderer/components/Icon';

const TopNav = () => {
  return (
    <div className="TopNav">
      <div className="thenewboston">
        <Logo />
        <h2>thenewboston</h2>
      </div>
      <div className="navigation-icons">
        <Icon icon="arrow" matchContainer />
        <Icon icon="arrow-forward" matchContainer />
      </div>
    </div>
  );
};

export default TopNav;

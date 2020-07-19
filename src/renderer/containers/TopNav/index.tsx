import React from 'react';

import Icon from '@renderer/components/Icon';
import Logo from '@renderer/components/Logo';

import './TopNav.scss';

const TopNav = () => {
  return (
    <div className="TopNav">
      <div className="thenewboston">
        <Logo />
        <h2>thenewboston</h2>
      </div>
      <div className="navigation-icons">
        <Icon icon="arrow_back" />
        <Icon icon="arrow_forward" />
      </div>
    </div>
  );
};

export default TopNav;

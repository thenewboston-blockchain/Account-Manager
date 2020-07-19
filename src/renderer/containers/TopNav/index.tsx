import React from 'react';

import Icon, {IconType} from '@renderer/components/Icon';
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
        <Icon icon={IconType.arrowLeft} />
        <Icon icon={IconType.arrowRight} />
      </div>
    </div>
  );
};

export default TopNav;

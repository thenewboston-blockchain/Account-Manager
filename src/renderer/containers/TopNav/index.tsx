import React from 'react';

import Icon, {IconType} from '@renderer/components/Icon';

import './TopNav.scss';

const TopNav = () => {
  return (
    <div className="TopNav">
      <div className="navigation-icons">
        <div>
          <Icon icon={IconType.arrowLeft} />
          <Icon icon={IconType.arrowRight} />
        </div>
        <div>
          <Icon icon={IconType.bell} />
          <Icon icon={IconType.helpCircle} />
          <Icon icon={IconType.cog} />
        </div>
      </div>
    </div>
  );
};

export default TopNav;

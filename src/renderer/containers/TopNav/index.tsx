import React, {FC} from 'react';

import Icon, {IconType} from '@renderer/components/Icon';

import './TopNav.scss';

const TopNav: FC = () => {
  return (
    <div className="TopNav">
      <div className="TopNav__container">
        <Icon className="TopNav__icon" icon={IconType.arrowLeft} />
        <Icon className="TopNav__icon" icon={IconType.arrowRight} />
      </div>
      <div className="TopNav__container">
        <Icon className="TopNav__icon" icon={IconType.bell} />
      </div>
    </div>
  );
};

export default TopNav;

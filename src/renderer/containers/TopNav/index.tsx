import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

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
        <NavLink className="TopNav__primary-validator" to="/validator/435622/overview">
          Primary Validator (8.143.224.25)
        </NavLink>
        <Icon className="TopNav__icon" icon={IconType.bell} />
      </div>
    </div>
  );
};

export default TopNav;

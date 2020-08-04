import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';
import {getActivePrimaryValidatorConfig} from '@renderer/selectors';

import './TopNav.scss';

const TopNav: FC = () => {
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);

  const renderLeft = (): ReactNode => (
    <div className="TopNav__container">
      <Icon className="TopNav__icon" icon={IconType.arrowLeft} />
      <Icon className="TopNav__icon" icon={IconType.arrowRight} />
    </div>
  );

  const renderRight = (): ReactNode => {
    if (!activePrimaryValidator) return null;
    return (
      <div className="TopNav__container">
        <NavLink
          className="TopNav__primary-validator"
          to={`/validator/${activePrimaryValidator.node_identifier}/overview`}
        >
          Primary Validator ({`${activePrimaryValidator.ip_address}`})
        </NavLink>
        <Icon className="TopNav__icon" icon={IconType.bell} />
      </div>
    );
  };

  return (
    <div className="TopNav">
      {renderLeft()}
      {renderRight()}
    </div>
  );
};

export default TopNav;

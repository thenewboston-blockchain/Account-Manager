import React, {FC, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';
import {getActivePrimaryValidatorConfig} from '@renderer/selectors';
import {unsetActiveBank, unsetActivePrimaryValidator} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types/store';

import './TopNav.scss';

const TopNav: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);

  const handleLogout = (): void => {
    dispatch(unsetActiveBank());
    dispatch(unsetActivePrimaryValidator());
  };

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
        <Icon className="TopNav__yoga" onClick={handleLogout} icon={IconType.yoga} />
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

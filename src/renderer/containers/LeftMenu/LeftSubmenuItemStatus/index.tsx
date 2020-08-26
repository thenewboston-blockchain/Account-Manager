import React, {FC, ReactNode} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';

import './LeftSubmenuItemStatus.scss';

export interface LeftSubmenuItemStatusProps extends RouteComponentProps {
  badge: 'active-bank' | 'primary-validator' | null;
  baseUrl: string;
  key: string;
  label: ReactNode;
  status: 'offline' | 'online';
  to: string;
}

const LeftSubmenuItemStatus: FC<LeftSubmenuItemStatusProps> = ({badge, baseUrl, key, label, location, status, to}) => {
  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

  const renderBadge = (): ReactNode => {
    if (!badge) return null;
    return (
      <div
        className={clsx('LeftSubmenuItemStatus__badge', {
          'LeftSubmenuItemStatus__badge--active-bank': badge === 'active-bank',
          'LeftSubmenuItemStatus__badge--primary-validator': badge === 'primary-validator',
        })}
      >
        {badge === 'active-bank' ? 'active' : 'primary'}
      </div>
    );
  };

  const renderStatusIcon = (): ReactNode => {
    return {
      offline: (
        <Icon
          className="LeftSubmenuItemStatus__Icon LeftSubmenuItemStatus__Icon--offline"
          icon={IconType.checkboxBlankCircleOutline}
          size={8}
        />
      ),
      online: (
        <Icon
          className="LeftSubmenuItemStatus__Icon LeftSubmenuItemStatus__Icon--online"
          icon={IconType.checkboxBlankCircle}
          size={8}
        />
      ),
    }[status];
  };

  return (
    <NavLink
      activeClassName="LeftSubmenuItemStatus--active"
      className="LeftSubmenuItemStatus"
      isActive={getIsActive}
      key={key}
      to={to}
    >
      {renderStatusIcon()}
      <div
        className={clsx('LeftSubmenuItemStatus__label', {
          'LeftSubmenuItemStatus__label--with-badge': badge,
        })}
      >
        {label}
      </div>
      {renderBadge()}
    </NavLink>
  );
};

export default withRouter(LeftSubmenuItemStatus);

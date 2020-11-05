import React, {FC, ReactNode} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import clsx from 'clsx';

import StatusBadge from '@renderer/components/StatusBadge';

import './LeftSubmenuItemStatus.scss';

export interface LeftSubmenuItemStatusProps extends RouteComponentProps {
  badge: 'active-bank' | 'primary-validator' | null;
  baseUrl: string;
  isOnline: boolean;
  key: string;
  label: ReactNode;
  to: string;
}

const LeftSubmenuItemStatus: FC<LeftSubmenuItemStatusProps> = ({
  badge,
  baseUrl,
  isOnline,
  key,
  label,
  location,
  to,
}) => {
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
        {badge === 'active-bank' ? 'Active' : 'Primary'}
      </div>
    );
  };

  return (
    <NavLink
      activeClassName="LeftSubmenuItemStatus--active"
      className="LeftSubmenuItemStatus"
      isActive={getIsActive}
      key={key}
      to={to}
    >
      <StatusBadge className="LeftSubmenuItemStatus__icon" status={isOnline ? 'active' : 'inactive'} />
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

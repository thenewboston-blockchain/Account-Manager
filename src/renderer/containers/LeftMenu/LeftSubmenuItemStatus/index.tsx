import React, {FC, ReactNode} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';

import './LeftSubmenuItemStatus.scss';

export interface LeftSubmenuItemStatusProps extends RouteComponentProps {
  baseUrl: string;
  isDefault?: boolean;
  key: string;
  label: ReactNode;
  status: 'offline' | 'online';
  to: string;
}

const LeftSubmenuItemStatus: FC<LeftSubmenuItemStatusProps> = ({
  baseUrl,
  isDefault = false,
  key,
  label,
  location,
  status,
  to,
}) => {
  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

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
          'LeftSubmenuItemStatus__label--with-badge': isDefault,
        })}
      >
        {label}
      </div>
      {isDefault ? <div className="LeftSubmenuItemStatus__badge">active</div> : null}
    </NavLink>
  );
};

export default withRouter(LeftSubmenuItemStatus);

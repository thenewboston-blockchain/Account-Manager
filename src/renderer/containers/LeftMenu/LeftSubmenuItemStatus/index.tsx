import React, {FC, ReactNode} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';

import './LeftSubmenuItemStatus.scss';

export interface LeftSubmenuItemStatusProps extends RouteComponentProps {
  baseUrl: string;
  key: string;
  label: ReactNode;
  status: 'offline' | 'online';
  to: string;
}

const LeftSubmenuItemStatus: FC<LeftSubmenuItemStatusProps> = ({baseUrl, key, label, location, status, to}) => {
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
      <span className="LeftSubmenuItemStatus__label">{label}</span>
    </NavLink>
  );
};

export default withRouter(LeftSubmenuItemStatus);

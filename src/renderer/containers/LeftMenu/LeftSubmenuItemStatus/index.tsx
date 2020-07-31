import React, {FC, ReactNode} from 'react';
import {NavLink} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';

import './LeftSubmenuItemStatus.scss';

export interface LeftSubmenuItemStatusProps {
  key: string;
  label: ReactNode;
  status: 'offline' | 'online';
  to: string;
}

const LeftSubmenuItemStatus: FC<LeftSubmenuItemStatusProps> = ({key, label, status, to}) => {
  const renderStatusIcon = (): ReactNode => {
    return {
      offline: (
        <Icon
          className="LeftSubmenuItemStatus__Icon LeftSubmenuItemStatus__Icon--offline"
          icon={IconType.checkboxBlankCircleOutline}
        />
      ),
      online: (
        <Icon
          className="LeftSubmenuItemStatus__Icon LeftSubmenuItemStatus__Icon--online"
          icon={IconType.checkboxBlankCircle}
        />
      ),
    }[status];
  };

  return (
    <NavLink className="LeftSubmenuItemStatus" key={key} to={to}>
      {renderStatusIcon()}
      <span className="LeftSubmenuItemStatus__label">{label}</span>
    </NavLink>
  );
};

export default LeftSubmenuItemStatus;

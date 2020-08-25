import React, {FC, ReactNode} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';

import './LeftSubmenuItem.scss';

export interface LeftSubmenuItemProps extends RouteComponentProps {
  baseUrl: string;
  key: string;
  label: ReactNode;
  to: string;
}

const LeftSubmenuItem: FC<LeftSubmenuItemProps> = ({baseUrl, key, label, location, to}) => {
  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

  return (
    <NavLink
      activeClassName="LeftSubmenuItem--active"
      className="LeftSubmenuItem"
      isActive={getIsActive}
      key={key}
      to={to}
    >
      <div className="LeftSubmenuItem__label">{label}</div>
    </NavLink>
  );
};

export default withRouter(LeftSubmenuItem);

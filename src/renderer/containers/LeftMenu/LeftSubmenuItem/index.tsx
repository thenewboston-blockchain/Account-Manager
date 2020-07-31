import React, {FC, ReactNode} from 'react';
import {NavLink} from 'react-router-dom';

import './LeftSubmenuItem.scss';

export interface LeftSubmenuItemProps {
  key: string;
  label: ReactNode;
  to: string;
}

const LeftSubmenuItem: FC<LeftSubmenuItemProps> = ({key, label, to}) => {
  return (
    <NavLink className="LeftSubmenuItem" key={key} to={to}>
      {label}
    </NavLink>
  );
};

export default LeftSubmenuItem;

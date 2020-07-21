import React, {FC, ReactNode} from 'react';
import {NavLink} from 'react-router-dom';

import ArrowToggle from '@renderer/components/ArrowToggle';
import Icon, {IconType} from '@renderer/components/Icon';
import useBooleanState from '@renderer/hooks/useBooleanState';

import './LeftSubmenu.scss';

export interface LeftSubmenuItem {
  key: string;
  label: ReactNode;
  to: string;
}

interface ComponentProps {
  addOnClick?(): void;
  menuItems: LeftSubmenuItem[];
  title: string;
}

const LeftSubmenu: FC<ComponentProps> = ({addOnClick, menuItems, title}) => {
  const [expanded, toggleExpanded] = useBooleanState(true);

  const renderMenuItems = (): ReactNode => {
    return menuItems.map(({key, label, to}) => (
      <NavLink className="LeftSubmenu__menu-item" key={key} to={to}>
        {label}
      </NavLink>
    ));
  };

  return (
    <div className="LeftSubmenu">
      <div className="LeftSubmenu__header">
        <div className="LeftSubmenu__left-items">
          <ArrowToggle expanded={expanded} onClick={toggleExpanded} />
          <span className="LeftSubmenu__title">{title}</span>
        </div>
        {addOnClick ? <Icon className="LeftSubmenu__add-icon" icon={IconType.plus} onClick={addOnClick} /> : null}
      </div>
      {expanded && renderMenuItems()}
    </div>
  );
};

export default LeftSubmenu;

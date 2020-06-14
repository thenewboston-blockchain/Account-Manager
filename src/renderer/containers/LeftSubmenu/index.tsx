import React, {FC, useState} from 'react';

import './LeftSubmenu.scss';

interface MenuItem {
  name: string;
}

interface ComponentProps {
  menuItems: MenuItem[];
  title: string;
}

const LeftSubmenu: FC<ComponentProps> = ({menuItems, title}) => {
  const [open, setExpanded] = useState<boolean>(true);

  const toggleExpanded = (): void => {
    setExpanded(!open);
  };

  return (
    <div className="LeftSubmenu">
      <div className="LeftSubmenu__header">
        <div className="left-items">
          <span className={`material-icons ${open ? 'open' : 'closed'}`} onClick={toggleExpanded}>
            play_arrow
          </span>
          <span className="submenu-title">{title}</span>
        </div>
        <div className="right-items">
          <span className="material-icons">add</span>
        </div>
      </div>
      {menuItems.map(({name}) => (
        <a className="MenuItem" href="#">
          {name}
        </a>
      ))}
    </div>
  );
};

export default LeftSubmenu;

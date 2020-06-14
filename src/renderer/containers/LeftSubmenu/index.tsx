import React, {FC, ReactNode, useState} from 'react';

import './LeftSubmenu.scss';

interface ComponentProps {
  menuItems: ReactNode[];
  title: string;
  tool?: ReactNode;
}

const LeftSubmenu: FC<ComponentProps> = ({menuItems, title, tool}) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleExpanded = (): void => {
    setOpen(!open);
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
        {tool && <div className="right-items">{tool}</div>}
      </div>
      {open && menuItems}
    </div>
  );
};

export default LeftSubmenu;

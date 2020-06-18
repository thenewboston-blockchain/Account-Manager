import React, {FC, ReactNode, useState} from 'react';

import ArrowToggle from '@renderer/components/ArrowToggle';

import './LeftSubmenu.scss';

interface ComponentProps {
  menuItems: ReactNode[];
  title: string;
  tool?: ReactNode;
}

const LeftSubmenu: FC<ComponentProps> = ({menuItems, title, tool}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpanded = (): void => {
    setExpanded(!expanded);
  };

  return (
    <div className="LeftSubmenu">
      <div className="LeftSubmenu__header">
        <div className="left-items">
          <ArrowToggle expanded={expanded} onClick={toggleExpanded} />
          <span className="submenu-title">{title}</span>
        </div>
        {tool && <div className="right-items">{tool}</div>}
      </div>
      {expanded && menuItems}
    </div>
  );
};

export default LeftSubmenu;

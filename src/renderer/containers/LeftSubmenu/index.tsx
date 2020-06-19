import React, {FC, ReactNode} from 'react';

import ArrowToggle from '@renderer/components/ArrowToggle';
import useBooleanState from '@renderer/hooks/useBooleanState';

import './LeftSubmenu.scss';

interface ComponentProps {
  menuItems: ReactNode[];
  title: string;
  tool?: ReactNode;
}

const LeftSubmenu: FC<ComponentProps> = ({menuItems, title, tool}) => {
  const [expanded, toggleExpanded] = useBooleanState(true);

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

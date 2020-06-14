import React, {FC, useState} from 'react';

import './LeftSubmenu.scss';

interface ComponentProps {
  title: string;
}

const LeftSubmenu: FC<ComponentProps> = ({title}) => {
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
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  );
};

export default LeftSubmenu;

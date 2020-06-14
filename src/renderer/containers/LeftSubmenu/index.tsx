import React, {FC} from 'react';

import './LeftSubmenu.scss';

interface ComponentProps {
  title: string;
}

const LeftSubmenu: FC<ComponentProps> = ({title}) => {
  return (
    <div className="LeftSubmenu">
      <div className="LeftSubmenu__header">
        <span className="header__title">{title}</span>
      </div>
    </div>
  );
};

export default LeftSubmenu;

import React, {FC} from 'react';

import './PageTabs.scss';

interface Item {
  active: boolean;
  name: string;
}

interface ComponentProps {
  items: Item[];
}

const PageTabs: FC<ComponentProps> = ({items}) => {
  return (
    <div className="PageTabs">
      {items.map(({active, name}) => (
        <div className={`tab ${active ? 'active' : ''}`} key={name}>
          <div className="tab-name">{name}</div>
          <div className="tab-indicator">&nbsp;</div>
        </div>
      ))}
    </div>
  );
};

export default PageTabs;

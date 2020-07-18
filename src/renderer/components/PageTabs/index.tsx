import React, {FC} from 'react';

import './PageTabs.scss';

interface Item {
  active: boolean;
  name: string;
  onClick?(name: string): void;
}

interface ComponentProps {
  items: Item[];
}

const PageTabs: FC<ComponentProps> = ({items}) => {
  return (
    <div className="PageTabs">
      {items.map(({active, name, onClick}) => (
        <div className={`tab ${active ? 'active' : ''}`} key={name} onClick={() => {
          if (onClick !== undefined) {
            onClick(name)
          }
        }}>
          <div className="tab-name">{name}</div>
          <div className="tab-indicator">&nbsp;</div>
        </div>
      ))}
    </div>
  );
};

export default PageTabs;

import React, {FC} from 'react';
import clsx from 'clsx';

import './PageTabs.scss';

interface Item {
  active: boolean;
  name: string;
  onClick(name: string): void;
}

interface ComponentProps {
  items: Item[];
}

const PageTabs: FC<ComponentProps> = ({items}) => {
  return (
    <div className="PageTabs">
      {items.map(({active, name, onClick}) => (
        <div className={clsx('tab', {active})} key={name} onClick={() => onClick(name)}>
          <div className="tab-name">{name}</div>
          <div className="tab-indicator" />
        </div>
      ))}
    </div>
  );
};

export default PageTabs;

import React, {FC} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';
import './PageTabs.scss';

interface Item {
  active: boolean;
  name: string;
  onClick(name: string): void;
}

interface ComponentProps {
  className?: string;
  items: Item[];
}

const PageTabs: FC<ComponentProps> = ({className, items}) => {
  return (
    <div className={clsx('PageTabs', className)}>
      {items.map(({active, name, onClick}) => (
        <div
          className={clsx('PageTabs__tab', {
            'PageTabs__tab--active': active,
            ...getCustomClassNames(className, '__tab', true),
            ...getCustomClassNames(className, '__tab--active', active),
          })}
          key={name}
          onClick={() => onClick(name)}
        >
          <div className={clsx('PageTabs__tab-name', {...getCustomClassNames(className, '__tab-name', true)})}>
            {name}
          </div>
          <div
            className={clsx('PageTabs__tab-indicator', {...getCustomClassNames(className, '__tab-indicator', true)})}
          />
        </div>
      ))}
    </div>
  );
};

export default PageTabs;

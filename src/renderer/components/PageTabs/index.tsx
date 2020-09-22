import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';

import './PageTabs.scss';

interface Item {
  name: string;
  page: string;
}

interface ComponentProps {
  baseUrl: string;
  breakpoint?: 'small' | 'large';
  items: Item[];
}

const PageTabs: FC<ComponentProps> = ({baseUrl, breakpoint = 'small', items}) => {
  return (
    <div
      className={clsx('PageTabs', {
        'PageTabs--large': breakpoint === 'large',
        'PageTabs--small': breakpoint === 'small',
      })}
    >
      {items.map(({name, page}) => (
        <NavLink activeClassName="PageTabs__tab--active" className="PageTabs__tab" key={page} to={`${baseUrl}/${page}`}>
          <div className="PageTabs__tab-name">{name}</div>
          <div className="PageTabs__tab-indicator" />
        </NavLink>
      ))}
    </div>
  );
};

export default PageTabs;

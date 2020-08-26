import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import './PageTabs.scss';

interface Item {
  name: string;
  page: string;
}

interface ComponentProps {
  baseUrl: string;
  items: Item[];
}

const PageTabs: FC<ComponentProps> = ({baseUrl, items}) => {
  return (
    <div className="PageTabs">
      {items.map(({name, page}) => (
        <NavLink
          activeClassName="PageTabs__tab--active"
          className="PageTabs__tab PageTabs__tabbable"
          key={page}
          to={`${baseUrl}/${page}`}
        >
          <div className="PageTabs__tab-name">{name}</div>
          <div className="PageTabs__tab-indicator" />
        </NavLink>
      ))}
    </div>
  );
};

export default PageTabs;

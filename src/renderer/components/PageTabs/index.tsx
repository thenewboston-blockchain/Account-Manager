import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import './PageTabs.scss';

interface Item {
  baseUrl: string;
  name: string;
  page: string;
}

interface ComponentProps {
  items: Item[];
}

const PageTabs: FC<ComponentProps> = ({items}) => {
  return (
    <div className="PageTabs">
      {items.map(({baseUrl, name, page}) => (
        <NavLink activeClassName="PageTabs__tab--active" className="PageTabs__tab" to={`${baseUrl}/${page}`}>
          <div className="PageTabs__tab-name">{name}</div>
          <div className="PageTabs__tab-indicator" />
        </NavLink>
      ))}
    </div>
  );
};

export default PageTabs;

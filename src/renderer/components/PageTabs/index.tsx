import React from 'react';

import './PageTabs.scss';

const tabs = [
  {
    name: 'Overview',
    active: true,
  },
  {
    name: 'Members',
    active: false,
  },
  {
    name: 'Transactions',
    active: false,
  },
  {
    name: 'Banks',
    active: false,
  },
  {
    name: 'Validators',
    active: false,
  },
];

const PageTabs = () => {
  return (
    <div className="PageTabs">
      {tabs.map(({active, name}) => (
        <div className={`tab ${active ? 'active' : ''}`} key={name}>
          <div className="tab-name">{name}</div>
          <div className="tab-indicator">&nbsp;</div>
        </div>
      ))}
    </div>
  );
};

export default PageTabs;

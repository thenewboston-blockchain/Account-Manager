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
  const renderTabs = () => {
    return tabs.map(({active, name}) => (
      <div className={`tab ${active ? 'active' : ''}`}>
        <div className="tab-name">{name}</div>
        <div className="tab-indicator">&nbsp;</div>
      </div>
    ));
  };

  return <div className="PageTabs">{renderTabs()}</div>;
};

export default PageTabs;

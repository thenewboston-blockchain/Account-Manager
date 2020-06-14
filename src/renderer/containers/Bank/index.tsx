import React from 'react';

import PageHeader from '@renderer/components/PageHeader';
import PageTabs from '@renderer/components/PageTabs';

import './Bank.scss';

const Bank = () => {
  const renderRightPageHeaderButtons = () => (
    <>
      <button className="button-outline-default">Add to Managed Banks</button>
      <button className="button-default">Register as Member</button>
    </>
  );

  return (
    <div className="Bank">
      <PageHeader
        rightContent={renderRightPageHeaderButtons()}
        title="Digital Ocean Bank (223.125.111.178)"
        trustScore={98.34}
      />
      <PageTabs />
    </div>
  );
};

export default Bank;

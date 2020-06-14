import React from 'react';

import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';

import './Bank.scss';

const Bank = () => {
  const renderRightPageHeaderButtons = () => (
    <>
      <button className="button-outline-default">Add to Managed Banks</button>
      <button className="button-default">Register as Member</button>
    </>
  );

  const renderSampleContent = () => {
    return [...Array(100)].map((_, i) => <h1 key={i}>{i}</h1>);
  };

  const renderTop = () => {
    return (
      <>
        <PageHeader
          rightContent={renderRightPageHeaderButtons()}
          title="Digital Ocean Bank (223.125.111.178)"
          trustScore={98.34}
        />
        <PageTabs />
      </>
    );
  };

  return (
    <div className="Bank">
      <PageLayout top={renderTop()} middle={renderSampleContent()} bottom={<Pagination />} />
    </div>
  );
};

export default Bank;

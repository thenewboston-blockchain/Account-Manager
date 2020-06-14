import React from 'react';

import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTable from '@renderer/containers/PageTable';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';
import TrustBadge from '@renderer/components/TrustBadge';

import './Bank.scss';

const Bank = () => {
  const renderRightPageHeaderButtons = () => (
    <>
      <button className="button-outline-default">Add to Managed Banks</button>
      <button className="button-default">Register as Member</button>
    </>
  );

  const renderTop = () => {
    return (
      <>
        <PageHeader
          leftTools={<TrustBadge score={98.34} />}
          rightContent={renderRightPageHeaderButtons()}
          title="Digital Ocean Bank (223.125.111.178)"
        />
        <PageTabs />
      </>
    );
  };

  return (
    <div className="Bank">
      <PageLayout top={renderTop()} middle={<PageTable />} bottom={<Pagination />} />
    </div>
  );
};

export default Bank;

import React from 'react';

import {Button} from '@renderer/components/FormElements';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTable from '@renderer/containers/PageTable';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';
import TrustBadge from '@renderer/components/TrustBadge';

import './Bank.scss';

const Bank = () => {
  const renderContent = () => (
    <>
      <PageTable />
      <Pagination />
    </>
  );

  const renderRightPageHeaderButtons = () => (
    <>
      <Button variant="outlined">Add to Managed Banks</Button>
      <Button>Register as Member</Button>
    </>
  );

  const renderTop = () => (
    <>
      <PageHeader
        leftTools={<TrustBadge score={98.34} />}
        rightContent={renderRightPageHeaderButtons()}
        title="Digital Ocean Bank (223.125.111.178)"
      />
      <PageTabs
        items={[
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
        ]}
      />
    </>
  );

  return (
    <div className="Bank">
      <PageLayout content={renderContent()} top={renderTop()} />
    </div>
  );
};

export default Bank;

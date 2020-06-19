import React from 'react';
import noop from 'lodash/noop';

import {Button} from '@renderer/components/FormElements';
import DropdownMenuButton, {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/containers/PageLayout';
import PageTable from '@renderer/containers/PageTable';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';
import TrustBadge from '@renderer/components/TrustBadge';

import './Bank.scss';

const Bank = () => {
  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: () => {
        console.log('YO');
      },
    },
    {
      label: 'Delete Account',
      onClick: noop,
    },
    {
      label: 'Unregister Bank',
      onClick: noop,
    },
  ];

  const renderContent = () => (
    <>
      <PageTable />
      <Pagination />
    </>
  );

  const renderLeftTools = () => {
    return (
      <>
        <TrustBadge score={98.34} />
        <DropdownMenuButton options={dropdownMenuOptions} />
      </>
    );
  };

  const renderRightPageHeaderButtons = () => (
    <>
      <Button variant="outlined">Add to Managed Banks</Button>
      <Button>Register as Member</Button>
    </>
  );

  const renderTop = () => (
    <>
      <PageHeader
        leftTools={renderLeftTools()}
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

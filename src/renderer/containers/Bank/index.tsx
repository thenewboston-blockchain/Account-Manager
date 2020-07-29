import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';

import {Button} from '@renderer/components/FormElements';
import DeleteModal from '@renderer/containers/Bank/DeleteModal';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import EditBankModal from '@renderer/containers/Bank/EditBankModal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTable from '@renderer/components/PageTable';
import PageTabs from '@renderer/components/PageTabs';
import Pagination from '@renderer/components/Pagination';

import useBooleanState from '@renderer/hooks/useBooleanState';
import sampleData from '@renderer/mock/OverviewSampleData';

import './Bank.scss';

const Bank: FC = (props) => {
  console.log(props);
  let {nid} = useParams();
  let {path, url} = useRouteMatch();
  console.log(path);
  console.log(url);
  console.log(nid);
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [editModalIsOpen, toggleEditModal] = useBooleanState(false);

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: toggleEditModal,
    },
    {
      label: 'Remove Bank',
      onClick: toggleDeleteModal,
    },
  ];

  const renderRightPageHeaderButtons = (): ReactNode => <Button>Add to Managed Banks</Button>;

  const renderTabContent = () => {
    const tabContentRoutes = [
      {
        content: <h1>Accounts</h1>,
        page: 'accounts',
      },
      {
        content: (
          <>
            <PageTable items={sampleData} />
            <Pagination />
          </>
        ),
        page: 'banks',
      },
      {
        content: <h1>Overview</h1>,
        page: 'overview',
      },
      {
        content: <h1>Transactions</h1>,
        page: 'transactions',
      },
      {
        content: <h1>Validators</h1>,
        page: 'validators',
      },
    ];

    return (
      <Switch>
        {tabContentRoutes.map(({content, page}) => (
          <Route path={`${path}/${page}`}>{content}</Route>
        ))}
      </Switch>
    );
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={dropdownMenuOptions}
        rightContent={renderRightPageHeaderButtons()}
        title={`Digital Ocean Bank (${nid})`}
        trustScore={98.34}
      />
      <PageTabs
        items={[
          {
            baseUrl: url,
            name: 'Overview',
            page: 'overview',
          },
          {
            baseUrl: url,
            name: 'Accounts',
            page: 'accounts',
          },
          {
            baseUrl: url,
            name: 'Transactions',
            page: 'transactions',
          },
          {
            baseUrl: url,
            name: 'Banks',
            page: 'banks',
          },
          {
            baseUrl: url,
            name: 'Validators',
            page: 'validators',
          },
        ]}
      />
    </>
  );

  return (
    <div className="Bank">
      <PageLayout content={renderTabContent()} top={renderTop()} />
      {deleteModalIsOpen && <DeleteModal toggleDeleteModal={toggleDeleteModal} />}
      {editModalIsOpen && <EditBankModal close={toggleEditModal} />}
    </div>
  );
};

export default withRouter(Bank);

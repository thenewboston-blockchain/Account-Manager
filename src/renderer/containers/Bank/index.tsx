import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';

import {Button} from '@renderer/components/FormElements';
import DeleteModal from '@renderer/containers/Bank/DeleteModal';
import DetailPanel from '@renderer/components/DetailPanel';
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

  const renderTabContent = () => (
    <Switch>
      <Route path={`${path}/accounts`}>
        <h1>Accounts</h1>
      </Route>
      <Route path={`${path}/banks`}>
        <PageTable items={sampleData} />
        <Pagination />
      </Route>
      <Route path={`${path}/overview`}>
        <DetailPanel
          className="Account__DetailPanel"
          items={[
            {
              key: 'Balance',
              value: '184.35',
            },
            {
              key: 'Account Number',
              value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
            },
            {
              key: 'Signing Key',
              value: '**************************',
            },
            {
              key: 'QR Code',
              value: '**************************',
            },
          ]}
          title="Bank Overview"
        />
      </Route>
      <Route path={`${path}/transactions`}>
        <h1>Transactions</h1>
      </Route>
      <Route path={`${path}/validators`}>
        <h1>Validators</h1>
      </Route>
    </Switch>
  );

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

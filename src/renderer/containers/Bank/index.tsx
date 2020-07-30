import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';

import Accounts from '@renderer/containers/Bank/Accounts';
import Banks from '@renderer/containers/Bank/Banks';
import {Button} from '@renderer/components/FormElements';
import DeleteBankModal from '@renderer/containers/Bank/DeleteBankModal';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import EditBankModal from '@renderer/containers/Bank/EditBankModal';
import Overview from '@renderer/containers/Bank/Overview';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import Transactions from '@renderer/containers/Bank/Transactions';
import Validators from '@renderer/containers/Bank/Validators';

import useBooleanState from '@renderer/hooks/useBooleanState';

import './Bank.scss';

const Bank: FC = () => {
  let {nid} = useParams();
  let {path, url} = useRouteMatch();
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
        content: <Accounts />,
        page: 'accounts',
      },
      {
        content: <Banks />,
        page: 'banks',
      },
      {
        content: <Overview />,
        page: 'overview',
      },
      {
        content: <Transactions />,
        page: 'transactions',
      },
      {
        content: <Validators />,
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
      {deleteModalIsOpen && <DeleteBankModal toggleDeleteModal={toggleDeleteModal} />}
      {editModalIsOpen && <EditBankModal close={toggleEditModal} />}
    </div>
  );
};

export default withRouter(Bank);

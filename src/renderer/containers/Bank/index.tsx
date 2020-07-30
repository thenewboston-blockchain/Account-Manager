import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch, withRouter} from 'react-router-dom';

import BankAccounts from '@renderer/containers/Bank/BankAccounts';
import BankBanks from '@renderer/containers/Bank/BankBanks';
import BankOverview from '@renderer/containers/Bank/BankOverview';
import BankTransactions from '@renderer/containers/Bank/BankTransactions';
import BankValidators from '@renderer/containers/Bank/BankValidators';
import DeleteBankModal from '@renderer/containers/Bank/DeleteBankModal';
import EditBankModal from '@renderer/containers/Bank/EditBankModal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';

import useBooleanState from '@renderer/hooks/useBooleanState';

import './Bank.scss';

const Bank: FC = () => {
  const {nid} = useParams();
  const {path, url} = useRouteMatch();
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

  const renderTabContent = (): ReactNode => {
    const tabContentRoutes = [
      {
        content: <BankAccounts />,
        page: 'accounts',
      },
      {
        content: <BankBanks />,
        page: 'banks',
      },
      {
        content: <BankOverview />,
        page: 'overview',
      },
      {
        content: <BankTransactions />,
        page: 'transactions',
      },
      {
        content: <BankValidators />,
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

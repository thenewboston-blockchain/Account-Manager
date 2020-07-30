import React, {FC, ReactNode} from 'react';
import {Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import noop from 'lodash/noop';

import AccountOverview from '@renderer/containers/Account/AccountOverview';
import AccountTransactions from '@renderer/containers/Account/AccountTransactions';
import DeleteAccountModal from '@renderer/containers/Account/DeleteAccountModal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';

import useBooleanState from '@renderer/hooks/useBooleanState';

import SendPointsModal from './SendPointsModal';

import './Account.scss';

const Account: FC = () => {
  let {accountNumber} = useParams();
  let {path, url} = useRouteMatch();
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [sendPointsModalIsOpen, toggleSendPointsModal] = useBooleanState(false);

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: noop,
    },
    {
      label: 'Delete Account',
      onClick: toggleDeleteModal,
    },
  ];

  const renderRightPageHeaderButtons = (): ReactNode => <Button onClick={toggleSendPointsModal}>Send Points</Button>;

  const renderTabContent = () => {
    const tabContentRoutes = [
      {
        content: <AccountOverview />,
        page: 'overview',
      },
      {
        content: <AccountTransactions />,
        page: 'transactions',
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
        title={`Donations (${accountNumber})`}
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
            name: 'Transactions',
            page: 'transactions',
          },
        ]}
      />
    </>
  );

  return (
    <div className="Account">
      <PageLayout content={renderTabContent()} top={renderTop()} />
      {deleteModalIsOpen && <DeleteAccountModal toggleDeleteModal={toggleDeleteModal} />}
      {sendPointsModalIsOpen && <SendPointsModal close={toggleSendPointsModal} />}
    </div>
  );
};

export default Account;

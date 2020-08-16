import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, useHistory, useParams, useRouteMatch} from 'react-router-dom';
import noop from 'lodash/noop';

import AccountOverview from '@renderer/containers/Account/AccountOverview';
import AccountTransactions from '@renderer/containers/Account/AccountTransactions';
import DeleteAccountModal from '@renderer/containers/Account/DeleteAccountModal';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {useBooleanState} from '@renderer/hooks';
import {getActiveBankConfig, getManagedAccounts} from '@renderer/selectors';
import {formatPathFromNode} from '@renderer/utils/address';

import SendPointsModal from './SendPointsModal';

import './Account.scss';

const Account: FC = () => {
  const {accountNumber} = useParams();
  const {path, url} = useRouteMatch();
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [sendPointsModalIsOpen, toggleSendPointsModal] = useBooleanState(false);
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const history = useHistory();
  const managedAccounts = useSelector(getManagedAccounts);
  const account = managedAccounts[accountNumber];

  if (!account) {
    // TODO: Users should still be able to browse accounts, even if they aren't in their managed/friends account
    // TODO: since they can get to various account by clicking account links in tables
    // TODO: Logic below was from deleting a managed account, but we really don't even need to redirect
    // TODO: since user can just stay on same page
    history.push(`/banks/${formatPathFromNode(activeBankConfig)}/overview`);
    return null;
  }

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

  const renderTabContent = (): ReactNode => {
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
          <Route key={page} path={`${path}/${page}`}>
            {content}
          </Route>
        ))}
      </Switch>
    );
  };

  const renderTop = (): ReactNode => (
    <>
      <PageHeader
        dropdownMenuOptions={dropdownMenuOptions}
        rightContent={renderRightPageHeaderButtons()}
        title={account.nickname || accountNumber}
      />
      <PageTabs
        baseUrl={url}
        items={[
          {
            name: 'Overview',
            page: 'overview',
          },
          {
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
      {deleteModalIsOpen && <DeleteAccountModal accountNumber={accountNumber} toggleDeleteModal={toggleDeleteModal} />}
      {sendPointsModalIsOpen && <SendPointsModal close={toggleSendPointsModal} />}
    </div>
  );
};

export default Account;

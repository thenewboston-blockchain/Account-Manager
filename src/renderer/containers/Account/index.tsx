import React, {FC, ReactNode, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import {Button} from '@thenewboston/ui';

import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import SendCoinsModal from '@renderer/containers/Account/SendCoinsModal';
import {useBooleanState} from '@renderer/hooks';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {AccountNumberParams, AccountType, ManagedAccount, ManagedFriend} from '@renderer/types';

import AccountOverview from './AccountOverview';
import AccountTransactions from './AccountTransactions';
import DeleteAccountModal from './DeleteAccountModal';
import DeleteFriendModal from './DeleteFriendModal';
import EditAccountNicknameModal from './EditAccountNicknameModal';
import './Account.scss';

const Account: FC = () => {
  const {accountNumber} = useParams<AccountNumberParams>();
  const {path, url} = useRouteMatch();
  const [deleteAccountModalIsOpen, toggleDeleteAccountModal] = useBooleanState(false);
  const [deleteFriendModalIsOpen, toggleDeleteFriendModal] = useBooleanState(false);
  const [editModalIsOpen, toggleEditModal] = useBooleanState(false);
  const [sendCoinsModalIsOpen, toggleSendCoinsModal] = useBooleanState(false);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const managedAccount = managedAccounts[accountNumber];
  const managedFriend = managedFriends[accountNumber];

  const type = useMemo<AccountType | null>(() => {
    let output: AccountType | null = null;

    if (managedAccount) {
      output = AccountType.managedAccount;
    } else if (managedFriend) {
      output = AccountType.managedFriend;
    }

    return output;
  }, [managedAccount, managedFriend]);

  const managedAccountOrFriend = useMemo<ManagedAccount | ManagedFriend | null>(() => {
    let output: ManagedAccount | ManagedFriend | null = null;

    if (managedAccount) {
      output = managedAccount;
    } else if (managedFriend) {
      output = managedFriend;
    }

    return output;
  }, [managedAccount, managedFriend]);

  const dropdownMenuOptions = useMemo<DropdownMenuOption[]>(() => {
    const editMenuOption: DropdownMenuOption = {
      label: 'Edit Nickname',
      onClick: toggleEditModal,
    };

    if (type === AccountType.managedAccount) {
      return [
        editMenuOption,
        {
          label: 'Delete Account',
          onClick: toggleDeleteAccountModal,
        },
      ];
    }

    if (type === AccountType.managedFriend) {
      return [
        editMenuOption,
        {
          label: 'Remove Friend',
          onClick: toggleDeleteFriendModal,
        },
      ];
    }

    return [];
  }, [toggleEditModal, toggleDeleteAccountModal, toggleDeleteFriendModal, type]);

  const renderRightPageHeaderButtons = (): ReactNode => <Button onClick={toggleSendCoinsModal}>Send Coins</Button>;

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
        title={managedAccountOrFriend?.nickname || accountNumber}
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

  const sendCoinsInitialRecipient = useMemo<string>(() => {
    let output: string;

    if (type === AccountType.managedAccount) {
      output = '';
    } else if (type === AccountType.managedFriend) {
      output = accountNumber;
    } else {
      output = accountNumber;
    }

    return output;
  }, [accountNumber, type]);

  const sendCoinsInitialSender = useMemo<string>(() => {
    let output: string;

    if (type === AccountType.managedAccount) {
      output = accountNumber;
    } else if (type === AccountType.managedFriend) {
      output = '';
    } else {
      output = '';
    }

    return output;
  }, [accountNumber, type]);

  return (
    <div className="Account">
      <PageLayout content={renderTabContent()} top={renderTop()} />
      {deleteAccountModalIsOpen && (
        <DeleteAccountModal close={toggleDeleteAccountModal} managedAccount={managedAccount} />
      )}
      {deleteFriendModalIsOpen && <DeleteFriendModal close={toggleDeleteFriendModal} managedFriend={managedFriend} />}
      {editModalIsOpen && managedAccountOrFriend && type ? (
        <EditAccountNicknameModal close={toggleEditModal} managedAccountOrFriend={managedAccountOrFriend} type={type} />
      ) : null}
      {sendCoinsModalIsOpen && (
        <SendCoinsModal
          close={toggleSendCoinsModal}
          initialRecipient={sendCoinsInitialRecipient}
          initialSender={sendCoinsInitialSender}
        />
      )}
    </div>
  );
};

export default Account;

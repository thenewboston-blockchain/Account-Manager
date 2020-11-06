import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, useParams, useRouteMatch} from 'react-router-dom';

import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import SendCoinsModal from '@renderer/containers/SendCoinsModal';
import {useBooleanState} from '@renderer/hooks';
import {getManagedAccounts} from '@renderer/selectors';

import AccountOverview from './AccountOverview';
import AccountTransactions from './AccountTransactions';
import DeleteAccountModal from './DeleteAccountModal';
import EditAccountNicknameModal from './EditAccountNicknameModal';
import './Account.scss';

const Account: FC = () => {
  const {accountNumber} = useParams<{accountNumber: string}>();
  const {path, url} = useRouteMatch();
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [editModalIsOpen, toggleEditModal] = useBooleanState(false);
  const [sendCoinsModalIsOpen, toggleSendCoinsModal] = useBooleanState(false);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccount = managedAccounts[accountNumber];

  const dropdownMenuOptions: DropdownMenuOption[] = managedAccount
    ? [
        {
          label: 'Edit Nickname',
          onClick: toggleEditModal,
        },
        {
          label: 'Delete Account',
          onClick: toggleDeleteModal,
        },
      ]
    : [];

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
        title={managedAccount?.nickname || accountNumber}
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
      {deleteModalIsOpen && <DeleteAccountModal close={toggleDeleteModal} managedAccount={managedAccount} />}
      {editModalIsOpen && <EditAccountNicknameModal close={toggleEditModal} managedAccount={managedAccount} />}
      {sendCoinsModalIsOpen && (
        <SendCoinsModal
          close={toggleSendCoinsModal}
          initialRecipient={managedAccount ? '' : accountNumber}
          initialSender={managedAccount ? accountNumber : ''}
        />
      )}
    </div>
  );
};

export default Account;

import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import noop from 'lodash/noop';

import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {useBooleanState} from '@renderer/hooks';
import {getManagedAccounts} from '@renderer/selectors';

import AccountOverview from './AccountOverview';
import AccountTransactions from './AccountTransactions';
import DeleteAccountModal from './DeleteAccountModal';
import SendPointsModal from './SendPointsModal';

import './Account.scss';

const Account: FC = () => {
  const {accountNumber} = useParams();
  const {path, url} = useRouteMatch();
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [sendPointsModalIsOpen, toggleSendPointsModal] = useBooleanState(false);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccount = managedAccounts[accountNumber];

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
      {deleteModalIsOpen && <DeleteAccountModal accountNumber={accountNumber} close={toggleDeleteModal} />}
      {sendPointsModalIsOpen && <SendPointsModal close={toggleSendPointsModal} />}
    </div>
  );
};

export default Account;

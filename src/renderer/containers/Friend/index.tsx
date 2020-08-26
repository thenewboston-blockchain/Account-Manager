import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, useParams, useRouteMatch} from 'react-router-dom';

import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import SendPointsModal from '@renderer/containers/SendPointsModal';
import {useBooleanState} from '@renderer/hooks';
import {getManagedFriends} from '@renderer/selectors';

import DeleteFriendModal from './DeleteFriendModal';
import EditFriendModal from './EditFriendModal';
import FriendOverview from './FriendOverview';
import FriendTransactions from './FriendTransactions';
import './Friend.scss';

const Friend: FC = () => {
  const {accountNumber} = useParams();
  const {path, url} = useRouteMatch();
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const [editModalIsOpen, toggleEditModal] = useBooleanState(false);
  const [sendPointsModalIsOpen, toggleSendPointsModal] = useBooleanState(false);
  const managedFriends = useSelector(getManagedFriends);
  const managedFriend = managedFriends[accountNumber];

  const getDropdownMenuOptions = (): DropdownMenuOption[] => {
    if (!managedFriend) return [];
    return [
      {
        label: 'Edit',
        onClick: toggleEditModal,
      },
      {
        label: 'Remove Friend',
        onClick: toggleDeleteModal,
      },
    ];
  };

  const renderRightPageHeaderButtons = (): ReactNode => <Button onClick={toggleSendPointsModal}>Send Points</Button>;

  const renderTabContent = (): ReactNode => {
    const tabContentRoutes = [
      {
        content: <FriendOverview />,
        page: 'overview',
      },
      {
        content: <FriendTransactions />,
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
        dropdownMenuOptions={getDropdownMenuOptions()}
        rightContent={renderRightPageHeaderButtons()}
        title={managedFriend?.nickname || accountNumber}
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
    <div className="friend">
      <PageLayout content={renderTabContent()} top={renderTop()} />
      {deleteModalIsOpen && <DeleteFriendModal close={toggleDeleteModal} friend={managedFriend} />}
      {editModalIsOpen && <EditFriendModal close={toggleEditModal} friend={managedFriend} />}
      {sendPointsModalIsOpen && (
        <SendPointsModal close={toggleSendPointsModal} initialRecipient={accountNumber} initialSender="" />
      )}
    </div>
  );
};

export default Friend;

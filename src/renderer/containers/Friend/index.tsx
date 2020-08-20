import React, {FC, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import noop from 'lodash/noop';

import DeleteFriendModal from '@renderer/containers/Friend/DeleteFriendModal';
import FriendOverview from '@renderer/containers/Friend/FriendOverview';
import PageHeader from '@renderer/components/PageHeader';
import PageLayout from '@renderer/components/PageLayout';
import PageTabs from '@renderer/components/PageTabs';
import {Button} from '@renderer/components/FormElements';
import {DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {useBooleanState} from '@renderer/hooks';
import {getManagedFriends} from '@renderer/selectors';

import './Friend.scss';

const Friend: FC = () => {
  const {accountNumber} = useParams();
  const {path, url} = useRouteMatch();
  const [deleteModalIsOpen, toggleDeleteModal] = useBooleanState(false);
  const managedFriends = useSelector(getManagedFriends);
  const managedFriend = managedFriends[accountNumber];

  const dropdownMenuOptions: DropdownMenuOption[] = [
    {
      label: 'Edit',
      onClick: noop,
    },
    {
      label: 'Delete Friend',
      onClick: toggleDeleteModal,
    },
  ];

  const renderRightPageHeaderButtons = (): ReactNode => <Button onClick={noop}>Send Points</Button>;

  const renderTabContent = (): ReactNode => {
    const tabContentRoutes = [
      {
        content: <FriendOverview />,
        page: 'overview',
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
        title={managedFriend?.nickname || accountNumber}
      />
      <PageTabs
        baseUrl={url}
        items={[
          {
            name: 'Overview',
            page: 'overview',
          },
        ]}
      />
    </>
  );

  return (
    <div className="friend">
      <PageLayout content={renderTabContent()} top={renderTop()} />
      {deleteModalIsOpen && <DeleteFriendModal accountNumber={accountNumber} close={toggleDeleteModal} />}
    </div>
  );
};

export default Friend;

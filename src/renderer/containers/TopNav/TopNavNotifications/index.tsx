import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import {useBooleanState} from '@renderer/hooks';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {displayErrorToast} from '@renderer/utils/toast';

import TopNavNotificationsMenu from './TopNavNotificationsMenu';
import './TopNavNotifications.scss';

const dropdownRoot = document.getElementById('dropdown-root')!;

const TopNavNotifications: FC = () => {
  const {pathname} = useLocation();
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);
  const [notifications, setNotifications] = useState<ReactNode[]>([]);
  const iconRef = useRef<HTMLDivElement>(null);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);

  useEffect(() => {
    const accountNumber = '4ed6c42c98a9f9b521f434df41e7de87a1543940121c895f3fb383bb8585d3ec';
    const socket = new WebSocket(`ws://143.110.137.54/ws/confirmation_blocks/${accountNumber}`);
    socket.onmessage = handleSocketMessage;
  });

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const getAccountNickname = (accountNumber: string): string => {
    const managedAccount = managedAccounts[accountNumber];

    if (managedAccount) {
      return managedAccount.nickname
        ? truncate(managedAccount.nickname, 16)
        : truncate(managedAccount.account_number, 8);
    }

    const managedFriend = managedFriends[accountNumber];

    if (managedFriend) {
      return managedFriend.nickname ? truncate(managedFriend.nickname, 16) : truncate(managedFriend.account_number, 8);
    }

    return accountNumber;
  };

  const getNotifications = (notificationType: string, payload: any): ReactNode[] => {
    switch (notificationType) {
      case 'CONFIRMATION_BLOCK_NOTIFICATION':
        return renderConfirmationReceivedNotification(payload);
      default:
        return [];
    }
  };

  const handleSocketMessage = (event: any) => {
    try {
      const {notification_type: notificationType, payload} = JSON.parse(event.data);
      const notification = getNotifications(notificationType, payload);
      setNotifications([notification, ...notifications]);
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const renderConfirmationReceivedNotification = (payload: any): ReactNode[] => {
    const {
      message: {
        block: {
          account_number: senderAccountNumber,
          message: {txs},
        },
      },
    } = payload;

    return txs.map(({amount, recipient: recipientAccountNumber}: any) => (
      <div className="TopNavNotifications__notification" key={recipientAccountNumber}>
        <Icon className="TopNavNotifications__Icon" icon={IconType.checkboxBlankCircle} size={8} />
        <div className="TopNavNotifications__right">
          <div className="TopNavNotifications__description">
            <div>
              <NavLink className="TopNavNotifications__NavLink" to={`/account/${senderAccountNumber}/overview`}>
                {getAccountNickname(senderAccountNumber)}
              </NavLink>{' '}
              paid you{' '}
              <NavLink className="TopNavNotifications__NavLink" to={`/account/${recipientAccountNumber}/overview`}>
                ({getAccountNickname(recipientAccountNumber)})
              </NavLink>
            </div>
            <div className="TopNavNotifications__time">1h ago</div>
          </div>
          <div className="TopNavNotifications__amount">+ {amount}</div>
        </div>
      </div>
    ));
  };

  const truncate = (str: string, size: number) => {
    return str.length <= size ? str : `${str.slice(0, size)}...`;
  };

  return (
    <>
      <Icon
        className={clsx('TopNavNotifications', {'TopNavNotifications--active': open})}
        icon={IconType.bell}
        onClick={toggleOpen}
        ref={iconRef}
      />
      {open &&
        createPortal(
          <TopNavNotificationsMenu
            iconRef={iconRef}
            menuOpen={open}
            notifications={notifications}
            toggleOpen={toggleOpen}
          />,
          dropdownRoot,
        )}
    </>
  );
};

export default TopNavNotifications;

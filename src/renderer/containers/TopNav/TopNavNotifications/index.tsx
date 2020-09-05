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

interface MenuNotification {
  notificationTime: number;
  notificationType: string;
  payload: any;
}

const TopNavNotifications: FC = () => {
  const {pathname} = useLocation();
  const [lastReadTime, setLastReadTime] = useState<number | null>(null);
  const [menuNotifications, setMenuNotifications] = useState<MenuNotification[]>([]);
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);

  useEffect(() => {
    const accountNumber = 'dfddf07ec15cbf363ecb52eedd7133b70b3ec896b488460bcecaba63e8e36be5';
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

  const handleBellClick = (): void => {
    if (open) {
      updateLastReadTime();
      closeMenu();
    } else {
      toggleOpen();
    }
  };

  const handleMenuClose = (): void => {
    updateLastReadTime();
    closeMenu();
  };

  const handleSocketMessage = (event: any) => {
    try {
      const notification = JSON.parse(event.data);
      const time = new Date().getTime();
      setMenuNotifications([
        ...menuNotifications,
        {
          notificationTime: time,
          notificationType: notification.notification_type,
          payload: notification.payload,
        },
      ]);
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const renderNotifications = (): ReactNode[] => {
    return menuNotifications
      .filter(({notificationType}) => notificationType === 'CONFIRMATION_BLOCK_NOTIFICATION')
      .map(({notificationTime, payload}) => {
        const {
          message: {
            block: {
              account_number: senderAccountNumber,
              message: {txs},
            },
          },
        } = payload;

        return txs.map(({amount, recipient}: any) => (
          <div className="TopNavNotifications__notification" key={recipient}>
            <Icon
              className={clsx('TopNavNotifications__Icon', {
                'TopNavNotifications__Icon--read': lastReadTime && lastReadTime < notificationTime,
              })}
              icon={IconType.checkboxBlankCircle}
              size={8}
            />
            <div className="TopNavNotifications__right">
              <div className="TopNavNotifications__description">
                <div>
                  <NavLink className="TopNavNotifications__NavLink" to={`/account/${senderAccountNumber}/overview`}>
                    {getAccountNickname(senderAccountNumber)}
                  </NavLink>{' '}
                  paid you{' '}
                  <NavLink className="TopNavNotifications__NavLink" to={`/account/${recipient}/overview`}>
                    ({getAccountNickname(recipient)})
                  </NavLink>
                </div>
                <div className="TopNavNotifications__time">1h ago</div>
              </div>
              <div className="TopNavNotifications__amount">+ {amount}</div>
            </div>
          </div>
        ));
      });
  };

  const truncate = (str: string, size: number) => {
    return str.length <= size ? str : `${str.slice(0, size)}...`;
  };

  const updateLastReadTime = (): void => {
    const time = new Date().getTime();
    console.warn(time);
    setLastReadTime(time);
  };

  return (
    <>
      <Icon
        className={clsx('TopNavNotifications', {'TopNavNotifications--active': open})}
        icon={IconType.bell}
        onClick={handleBellClick}
        ref={iconRef}
      />
      {open &&
        createPortal(
          <TopNavNotificationsMenu
            handleMenuClose={handleMenuClose}
            iconRef={iconRef}
            menuOpen={open}
            notifications={renderNotifications()}
            updateLastReadTime={updateLastReadTime}
          />,
          dropdownRoot,
        )}
    </>
  );
};

export default TopNavNotifications;

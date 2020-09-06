import React, {FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import TimeAgo from 'timeago-react';

import Icon, {IconType} from '@renderer/components/Icon';
import {useBooleanState} from '@renderer/hooks';
import {getActiveBank, getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {setManagedAccountBalance} from '@renderer/store/app';
import {formatSocketAddress} from '@renderer/utils/address';
import {displayErrorToast} from '@renderer/utils/toast';
import {AppDispatch} from '@renderer/types';

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
  const [lastReadTime, setLastReadTime] = useState<number>(new Date().getTime());
  const [menuNotifications, setMenuNotifications] = useState<MenuNotification[]>([]);
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);
  const [websockets, setWebsockets] = useState([]);
  const activeBank = useSelector(getActiveBank)!;
  const dispatch = useDispatch<AppDispatch>();
  const bankSocketAddress = formatSocketAddress(activeBank.ip_address, activeBank.port);
  const iconRef = useRef<HTMLDivElement>(null);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);

  const managedAccountNumbers = Object.values(managedAccounts)
    .map(({account_number}) => account_number)
    .sort()
    .join('-');

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const accountNumbers = managedAccountNumbers.split('-');
    const sockets: any = accountNumbers.map(
      (accountNumber) => new WebSocket(`${bankSocketAddress}/ws/confirmation_blocks/${accountNumber}`),
    );
    setWebsockets(sockets);
    return () => {
      sockets.forEach((socket: any) => socket.close());
    };
  }, [bankSocketAddress, managedAccountNumbers]);

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

  const getUnreadNotificationsLength = (): number => {
    return menuNotifications.filter(({notificationTime}) => lastReadTime < notificationTime).length;
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

  const processUpdatedBalances = useCallback(
    (updatedBalances: any[]) => {
      const accountNumbers = managedAccountNumbers.split('-');
      updatedBalances
        .filter(({account_number: accountNumber}) => accountNumbers.includes(accountNumber))
        .forEach(({account_number: accountNumber, balance}) => {
          dispatch(
            setManagedAccountBalance({
              account_number: accountNumber,
              balance: balance || '0',
            }),
          );
        });
    },
    [dispatch, managedAccountNumbers],
  );

  useEffect(() => {
    websockets.forEach((socket: any) => {
      socket.onmessage = (event: any) => {
        try {
          const notification = JSON.parse(event.data);

          if (notification.notification_type === 'CONFIRMATION_BLOCK_NOTIFICATION') {
            const blockIdentifiers = menuNotifications
              .filter(({notificationType}) => notificationType === 'CONFIRMATION_BLOCK_NOTIFICATION')
              .map((confirmationBlockNotification) => confirmationBlockNotification.payload.message.block_identifier);

            const blockIdentifier = notification.payload.message.block_identifier;
            if (blockIdentifiers.includes(blockIdentifier)) return;
          }

          const updatedBalances = notification.payload.message.updated_balances;
          processUpdatedBalances(updatedBalances);

          const time = new Date().getTime();
          setMenuNotifications([
            {
              notificationTime: time,
              notificationType: notification.notification_type,
              payload: notification.payload,
            },
            ...menuNotifications,
          ]);
        } catch (error) {
          displayErrorToast(error);
        }
      };
    });
  }, [menuNotifications, processUpdatedBalances, websockets]);

  const renderNotifications = (): ReactNode[] => {
    let notifications = menuNotifications.filter(
      ({notificationType}) => notificationType === 'CONFIRMATION_BLOCK_NOTIFICATION',
    );
    notifications = sortBy(notifications, ['notificationTime']);
    notifications = reverse(notifications);

    return notifications.map(({notificationTime, payload}) => {
      const {
        message: {
          block: {
            account_number: senderAccountNumber,
            message: {txs},
          },
        },
      } = payload;

      return txs.map(({amount, recipient}: any) => {
        const read = lastReadTime > notificationTime;

        return (
          <div className="TopNavNotifications__notification" key={recipient}>
            <Icon
              className={clsx('TopNavNotifications__Icon', {
                'TopNavNotifications__Icon--read': read,
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
                <div
                  className={clsx('TopNavNotifications__time', {
                    'TopNavNotifications__time--read': read,
                  })}
                >
                  <TimeAgo datetime={notificationTime} />
                </div>
              </div>
              <div className="TopNavNotifications__amount">+ {amount}</div>
            </div>
          </div>
        );
      });
    });
  };

  const renderUnreadNotificationsDot = (): ReactNode => {
    return getUnreadNotificationsLength() ? (
      <span className="TopNavNotifications__unread-notifications-dot" onClick={handleBellClick} />
    ) : null;
  };

  const truncate = (str: string, size: number) => {
    return str.length <= size ? str : `${str.slice(0, size)}...`;
  };

  const updateLastReadTime = (): void => {
    const time = new Date().getTime();
    setLastReadTime(time);
  };

  return (
    <>
      <div className="TopNavNotifications__Icon-container">
        <Icon
          className={clsx('TopNavNotifications', {'TopNavNotifications--active': open})}
          icon={IconType.bell}
          onClick={handleBellClick}
          ref={iconRef}
        />
        {renderUnreadNotificationsDot()}
      </div>
      {open &&
        createPortal(
          <TopNavNotificationsMenu
            handleMenuClose={handleMenuClose}
            iconRef={iconRef}
            menuOpen={open}
            notifications={renderNotifications()}
            unreadNotificationsLength={getUnreadNotificationsLength()}
            updateLastReadTime={updateLastReadTime}
          />,
          dropdownRoot,
        )}
    </>
  );
};

export default TopNavNotifications;

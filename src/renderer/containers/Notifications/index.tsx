import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import TimeAgo from 'timeago-react';

import Icon, {IconType} from '@renderer/components/Icon';
import {useBooleanState} from '@renderer/hooks';
import {getManagedAccounts, getManagedFriends, getNotifications} from '@renderer/selectors';

import NotificationsMenu from './NotificationsMenu';
import './Notifications.scss';

const dropdownRoot = document.getElementById('dropdown-root')!;

const Notifications: FC = () => {
  const {pathname} = useLocation();
  const [lastReadTime, setLastReadTime] = useState<number>(new Date().getTime());
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const notifications = useSelector(getNotifications);

  const menuNotifications = Object.values(notifications);

  const managedAccountNumbers = Object.values(managedAccounts)
    .map(({account_number}) => account_number)
    .sort()
    .join('-');

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

    return truncate(accountNumber, 16);
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

  const renderNotifications = (): ReactNode[] => {
    const accountNumbers = managedAccountNumbers.split('-');

    let confirmationBlockNotifications = menuNotifications.filter(
      ({notificationType}) => notificationType === 'CONFIRMATION_BLOCK_NOTIFICATION',
    );
    confirmationBlockNotifications = sortBy(confirmationBlockNotifications, ['notificationTime']);
    confirmationBlockNotifications = reverse(confirmationBlockNotifications);

    return confirmationBlockNotifications.map(({notificationTime, payload}) => {
      const {
        message: {
          block: {
            account_number: senderAccountNumber,
            message: {txs},
          },
        },
      } = payload;

      return txs
        .filter(({recipient}: any) => accountNumbers.includes(recipient))
        .map(({amount, recipient}: any) => {
          const read = lastReadTime > notificationTime;

          return (
            <div className="Notifications__notification" key={recipient}>
              <Icon
                className={clsx('Notifications__Icon', {
                  'Notifications__Icon--read': read,
                })}
                icon={IconType.checkboxBlankCircle}
                size={8}
              />
              <div className="Notifications__right">
                <div className="Notifications__description">
                  <div>
                    <NavLink className="Notifications__NavLink" to={`/account/${senderAccountNumber}/overview`}>
                      {getAccountNickname(senderAccountNumber)}
                    </NavLink>{' '}
                    paid you{' '}
                    <NavLink className="Notifications__NavLink" to={`/account/${recipient}/overview`}>
                      ({getAccountNickname(recipient)})
                    </NavLink>
                  </div>
                  <div
                    className={clsx('Notifications__time', {
                      'Notifications__time--read': read,
                    })}
                  >
                    <TimeAgo datetime={notificationTime} />
                  </div>
                </div>
                <div className="Notifications__amount">+ {amount}</div>
              </div>
            </div>
          );
        });
    });
  };

  const renderUnreadNotificationsDot = (): ReactNode => {
    return getUnreadNotificationsLength() ? (
      <span className="Notifications__unread-notifications-dot" onClick={handleBellClick} />
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
      <div className="Notifications__Icon-container">
        <Icon
          className={clsx('Notifications', {'Notifications--active': open})}
          icon={IconType.bell}
          onClick={handleBellClick}
          ref={iconRef}
        />
        {renderUnreadNotificationsDot()}
      </div>
      {open &&
        createPortal(
          <NotificationsMenu
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

export default Notifications;

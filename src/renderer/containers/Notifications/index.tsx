import React, {FC, Fragment, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import {Icon, IconType} from '@thenewboston/ui';

import StatusBadge from '@renderer/components/StatusBadge';
import {useBooleanState} from '@renderer/hooks';
import {getManagedAccounts, getManagedFriends, getNotifications} from '@renderer/selectors';
import {
  ConfirmationBlockNotificationPayload,
  CrawlStatusNotificationPayload,
  CleanStatusNotificationPayload,
  NotificationPayload,
  NotificationType,
  PrimaryValidatorUpdatedNotificationPayload,
  ValidatorConfirmationServiceNotificationPayload,
} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {sortByNumberKey} from '@renderer/utils/sort';

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

  const managedAccountNumbersString = useMemo(
    () =>
      Object.values(managedAccounts)
        .map(({account_number}) => account_number)
        .sort()
        .join('-'),
    [managedAccounts],
  );
  const managedAccountNumbers = useMemo(() => managedAccountNumbersString.split('-'), [managedAccountNumbersString]);

  const unreadNotificationsLength = useMemo(
    () => notifications.filter(({timestamp}) => lastReadTime < timestamp).length,
    [lastReadTime, notifications],
  );

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

  const renderConfirmationBlockNotification = ({data, timestamp}: ConfirmationBlockNotificationPayload): ReactNode => {
    const {
      message: {
        block: {
          account_number: senderAccountNumber,
          message: {txs},
        },
      },
    } = data;

    return txs
      .filter(({recipient}) => managedAccountNumbers.includes(recipient))
      .map(({amount, recipient}) => {
        const description = (
          <>
            <NavLink className="Notifications__NavLink" to={`/account/${senderAccountNumber}/overview`}>
              {getAccountNickname(senderAccountNumber)}
            </NavLink>{' '}
            paid you{' '}
            <NavLink className="Notifications__NavLink" to={`/account/${recipient}/overview`}>
              ({getAccountNickname(recipient)})
            </NavLink>
          </>
        );

        return renderNotification({amount, description, id: recipient, timestamp});
      });
  };

  const renderCrawlStatusNotification = ({data, id, timestamp}: CrawlStatusNotificationPayload): ReactNode => {
    const nodeAddress = formatAddressFromNode(data);
    return renderNotification({description: `${nodeAddress} has stopped crawling`, id, timestamp});
  };

  const renderCleanStatusNotification = ({data, id, timestamp}: CleanStatusNotificationPayload): ReactNode => {
    const nodeAddress = formatAddressFromNode(data);
    return renderNotification({description: `${nodeAddress} has stopped cleaning`, id, timestamp});
  };

  const renderNotification = ({
    amount,
    description,
    id,
    timestamp,
  }: {
    amount?: number;
    description: ReactNode;
    id: string;
    timestamp: number;
  }): ReactNode => {
    const read = lastReadTime > timestamp;

    return (
      <div className="Notifications__notification" key={id}>
        {!read && <StatusBadge className="Notifications__row-alert-badge" status="alert" />}
        <div className="Notifications__description">
          <div>{description}</div>
          {renderTimeAgo(timestamp, read)}
        </div>
        {amount !== undefined && <div className="Notifications__amount">+ {amount}</div>}
      </div>
    );
  };

  const renderNotificationReducer = (notification: NotificationPayload): ReactNode => {
    if (notification.type === NotificationType.confirmationBlockNotification) {
      return renderConfirmationBlockNotification(notification as ConfirmationBlockNotificationPayload);
    }
    if (notification.type === NotificationType.crawlStatusNotification) {
      return renderCrawlStatusNotification(notification as CrawlStatusNotificationPayload);
    }
    if (notification.type === NotificationType.cleanStatusNotification) {
      return renderCleanStatusNotification(notification as CleanStatusNotificationPayload);
    }
    if (notification.type === NotificationType.primaryValidatorUpdatedNotification) {
      return renderPrimaryValidatorUpdatedNotification(notification as PrimaryValidatorUpdatedNotificationPayload);
    }
    if (notification.type === NotificationType.validatorConfirmationServiceNotification) {
      return renderValidatorConfirmationServiceNotification(
        notification as ValidatorConfirmationServiceNotificationPayload,
      );
    }
    return null;
  };

  const renderNotifications = (): ReactNode[] => {
    return notifications
      .slice()
      .sort(sortByNumberKey('timestamp'))
      .map((notification) => {
        return <Fragment key={notification.id}>{renderNotificationReducer(notification)}</Fragment>;
      });
  };

  const renderPrimaryValidatorUpdatedNotification = ({
    data: primaryValidatorAddress,
    id,
    timestamp,
  }: PrimaryValidatorUpdatedNotificationPayload): ReactNode => {
    return renderNotification({
      description: `The networks Primary Validator has been changed to ${primaryValidatorAddress}`,
      id,
      timestamp,
    });
  };

  const renderTimeAgo = (timestamp: number, read: boolean): ReactNode => {
    return (
      <div
        className={clsx('Notifications__time-ago', {
          'Notifications__time-ago--read': read,
        })}
      >
        {formatDistanceToNow(timestamp, {includeSeconds: true})} ago
      </div>
    );
  };

  const renderValidatorConfirmationServiceNotification = ({
    data,
    id,
    timestamp,
  }: ValidatorConfirmationServiceNotificationPayload): ReactNode => {
    const {
      validator_confirmation_service: {start, end},
    } = data;
    const validatorConfirmationServiceDuration = intervalToDuration({
      end: new Date(end),
      start: new Date(start),
    });

    return renderNotification({
      description: `Your bank purchased a validator confirmation service for ${formatDuration(
        validatorConfirmationServiceDuration,
      )}`,
      id,
      timestamp,
    });
  };

  const truncate = (str: string, size: number): string => {
    return str.length <= size ? str : `${str.slice(0, size)}...`;
  };

  const updateLastReadTime = (): void => {
    const time = new Date().getTime();
    setLastReadTime(time);
  };

  return (
    <>
      <div className="Notifications__icon-container">
        <Icon
          className={clsx('Notifications', {'Notifications--active': open})}
          icon={IconType.bell}
          onClick={handleBellClick}
          ref={iconRef}
        />
        {unreadNotificationsLength ? <StatusBadge className="Notifications__bell-alert-badge" status="alert" /> : null}
      </div>
      {open &&
        createPortal(
          <NotificationsMenu
            handleMenuClose={handleMenuClose}
            iconRef={iconRef}
            menuOpen={open}
            notifications={renderNotifications()}
            unreadNotificationsLength={unreadNotificationsLength}
            updateLastReadTime={updateLastReadTime}
          />,
          dropdownRoot,
        )}
    </>
  );
};

export default Notifications;

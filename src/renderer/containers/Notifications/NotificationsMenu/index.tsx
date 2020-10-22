import React, {FC, ReactNode, RefObject, useRef} from 'react';
import noop from 'lodash/noop';
import clsx from 'clsx';

import {useEventListener} from '@renderer/hooks';

import './NotificationsMenu.scss';

interface ComponentProps {
  handleMenuClose(): void;
  iconRef: RefObject<HTMLDivElement>;
  menuOpen: boolean;
  notifications: ReactNode[];
  unreadNotificationsLength: number;
  updateLastReadTime(): void;
}

const NotificationsMenu: FC<ComponentProps> = ({
  handleMenuClose,
  iconRef,
  menuOpen,
  notifications,
  unreadNotificationsLength,
  updateLastReadTime,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any): void => {
    if (menuOpen && !iconRef.current?.contains(e.target) && !menuRef.current?.contains(e.target)) {
      handleMenuClose();
    }
  };

  useEventListener('mousedown', handleClick, document);

  const renderHeader = (): ReactNode => {
    return (
      <div className="NotificationsMenu__header">
        <div className="NotificationsMenu__header-left">
          <h2>Notifications</h2>
          <span className="NotificationsMenu__count">{unreadNotificationsLength} unread</span>
        </div>
        <span
          className={clsx('NotificationsMenu__mark-as-read', {
            'NotificationsMenu__mark-as-read--disabled': !unreadNotificationsLength,
          })}
          onClick={unreadNotificationsLength ? updateLastReadTime : noop}
        >
          Mark all as read
        </span>
      </div>
    );
  };

  const renderEmptyState = (): ReactNode => {
    return (
      <div className="NotificationsMenu__empty">
        <h1>No notifications</h1>
      </div>
    );
  };

  return (
    <div className="NotificationsMenu" ref={menuRef}>
      {renderHeader()}
      {notifications.length ? notifications : renderEmptyState()}
    </div>
  );
};

export default NotificationsMenu;

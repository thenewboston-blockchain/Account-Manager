import React, {FC, ReactNode, RefObject, useRef} from 'react';
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
        <span className="NotificationsMenu__mark-as-read" onClick={updateLastReadTime}>
          Mark all as read
        </span>
      </div>
    );
  };

  return (
    <div className="NotificationsMenu" ref={menuRef}>
      {renderHeader()}
      {notifications}
    </div>
  );
};

export default NotificationsMenu;

import React, {FC, ReactNode, RefObject, useRef} from 'react';
import {useEventListener} from '@renderer/hooks';

import './TopNavNotificationsMenu.scss';

interface ComponentProps {
  handleMenuClose(): void;
  iconRef: RefObject<HTMLDivElement>;
  menuOpen: boolean;
  notifications: ReactNode[];
  updateLastReadTime(): void;
}

const TopNavNotificationsMenu: FC<ComponentProps> = ({
  handleMenuClose,
  iconRef,
  menuOpen,
  notifications,
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
      <div className="TopNavNotificationsMenu__header">
        <div className="TopNavNotificationsMenu__header-left">
          <h2>Notifications</h2>
          <span className="TopNavNotificationsMenu__count">5 unread</span>
        </div>
        <span className="TopNavNotificationsMenu__mark-as-read" onClick={updateLastReadTime}>
          Mark all as read
        </span>
      </div>
    );
  };

  return (
    <div className="TopNavNotificationsMenu" ref={menuRef}>
      {renderHeader()}
      {notifications}
    </div>
  );
};

export default TopNavNotificationsMenu;

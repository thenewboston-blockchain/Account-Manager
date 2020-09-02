import React, {FC, ReactNode, RefObject, useRef} from 'react';
import {NavLink} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';
import {useEventListener} from '@renderer/hooks';

import './TopNavNotificationsMenu.scss';

interface ComponentProps {
  iconRef: RefObject<HTMLDivElement>;
  menuOpen: boolean;
  toggleOpen(): void;
}

const TopNavNotificationsMenu: FC<ComponentProps> = ({iconRef, menuOpen, toggleOpen}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any): void => {
    if (menuOpen && !iconRef.current?.contains(e.target) && !menuRef.current?.contains(e.target)) {
      toggleOpen();
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
        <span className="TopNavNotificationsMenu__mark-as-read">Mark all as read</span>
      </div>
    );
  };

  const renderNodeAlert = (): ReactNode => {
    return (
      <div className="TopNavNotificationsMenu__notification">
        <Icon className="TopNavNotificationsMenu__Icon" icon={IconType.checkboxBlankCircle} size={8} />
        <div className="TopNavNotificationsMenu__right">
          <div className="TopNavNotificationsMenu__description">
            <NavLink
              className="TopNavNotificationsMenu__NavLink"
              to="/account/5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8/overview"
            >
              The networks Primary Validator has been changed to 64.225.47.205
            </NavLink>
            <div className="TopNavNotificationsMenu__time">1h ago</div>
          </div>
        </div>
      </div>
    );
  };

  const renderNotification = (): ReactNode => {
    return (
      <div className="TopNavNotificationsMenu__notification">
        <Icon className="TopNavNotificationsMenu__Icon" icon={IconType.checkboxBlankCircle} size={8} />
        <div className="TopNavNotificationsMenu__right">
          <div className="TopNavNotificationsMenu__description">
            <div>
              <NavLink
                className="TopNavNotificationsMenu__NavLink"
                to="/account/5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8/overview"
              >
                Justin
              </NavLink>{' '}
              paid you{' '}
              <NavLink
                className="TopNavNotificationsMenu__NavLink"
                to="/account/5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8/overview"
              >
                (Personal)
              </NavLink>
            </div>
            <div className="TopNavNotificationsMenu__time">1h ago</div>
          </div>
          <div className="TopNavNotificationsMenu__amount">+ 100.0000000000000000</div>
        </div>
      </div>
    );
  };

  return (
    <div className="TopNavNotificationsMenu" ref={menuRef}>
      {renderHeader()}
      {renderNotification()}
      {renderNotification()}
      {renderNodeAlert()}
    </div>
  );
};

export default TopNavNotificationsMenu;

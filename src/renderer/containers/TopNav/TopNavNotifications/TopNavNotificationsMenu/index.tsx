import React, {FC, ReactNode, useRef} from 'react';
import {NavLink} from 'react-router-dom';

import {useEventListener} from '@renderer/hooks';

import './TopNavNotificationsMenu.scss';

interface ComponentProps {
  iconRef: any;
  menuOpen: boolean;
  setMenuOpen: Function;
}

const TopNavNotificationsMenu: FC<ComponentProps> = ({iconRef, menuOpen, setMenuOpen}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any): void => {
    if (iconRef && menuOpen && !iconRef.current?.contains(e.target) && !menuRef.current?.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEventListener('mousedown', handleClick, document);

  const renderPayment = (): ReactNode => {
    return <div className="TopNavNotificationsMenu__payment">Hey</div>;
  };

  return (
    <div className="TopNavNotificationsMenu" ref={menuRef}>
      <h2>Notifications</h2>
      <NavLink
        className="AccountLink"
        to="/account/5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8/overview"
      >
        Click
      </NavLink>
      {renderPayment()}
      {renderPayment()}
      {renderPayment()}
    </div>
  );
};

export default TopNavNotificationsMenu;

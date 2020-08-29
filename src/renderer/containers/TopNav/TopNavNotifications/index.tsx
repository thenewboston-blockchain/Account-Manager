import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';
import {useEventListener} from '@renderer/hooks';

import './TopNavNotifications.scss';

const TopNavNotifications: FC<RouteComponentProps> = ({location: {pathname}}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  const handleClick = (e: any): void => {
    if (!iconRef) return;

    if (!menuOpen && iconRef.current?.contains(e.target)) {
      setMenuOpen(true);
      return;
    }

    if (menuOpen && !menuRef.current?.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEventListener('mousedown', handleClick, document);

  const renderMenu = (): ReactNode => {
    if (!menuOpen) return null;
    return (
      <div className="TopNavNotifications__menu" ref={menuRef}>
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

  const renderPayment = (): ReactNode => {
    return <div className="TopNavNotifications__menu__payment">Hey</div>;
  };

  return (
    <>
      <div className="TopNavNotifications">
        <Icon className="TopNav__icon" icon={IconType.bell} ref={iconRef} />
      </div>
      {renderMenu()}
    </>
  );
};

export default withRouter(TopNavNotifications);

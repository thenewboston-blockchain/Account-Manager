import React, {FC, useEffect, useRef, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import Icon, {IconType} from '@renderer/components/Icon';

import TopNavNotificationsMenu from './TopNavNotificationsMenu';
import './TopNavNotifications.scss';

const TopNavNotifications: FC<RouteComponentProps> = ({location: {pathname}}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  const handleIconClick = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="TopNavNotifications">
        <Icon className="TopNav__icon" icon={IconType.bell} onClick={handleIconClick} ref={iconRef} />
      </div>
      {menuOpen && <TopNavNotificationsMenu iconRef={iconRef} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
    </>
  );
};

export default withRouter(TopNavNotifications);

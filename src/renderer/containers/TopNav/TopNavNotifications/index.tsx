import React, {FC, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {useLocation} from 'react-router-dom';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import {useBooleanState} from '@renderer/hooks';

import TopNavNotificationsMenu from './TopNavNotificationsMenu';
import './TopNavNotifications.scss';

const dropdownRoot = document.getElementById('dropdown-root')!;

const TopNavNotifications: FC = () => {
  const {pathname} = useLocation();
  const iconRef = useRef<HTMLDivElement>(null);
  const [open, toggleOpen, , closeMenu] = useBooleanState(false);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <>
      <Icon
        className={clsx('TopNavNotifications', {'TopNavNotifications--active': open})}
        icon={IconType.bell}
        onClick={toggleOpen}
        ref={iconRef}
      />
      {open &&
        createPortal(
          <TopNavNotificationsMenu iconRef={iconRef} menuOpen={open} toggleOpen={toggleOpen} />,
          dropdownRoot,
        )}
    </>
  );
};

export default TopNavNotifications;

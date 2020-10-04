import React, {FC, ReactNode} from 'react';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';

import './LeftSubmenuItemLink.scss';

export interface LeftSubmenuItemLinkProps extends RouteComponentProps {
  baseUrl: string;
  key: string;
  label: ReactNode;
  link: string;
  to: string;
}

const LeftSubmenuItemLink: FC<LeftSubmenuItemLinkProps> = ({baseUrl, key, label, link, location, to}) => {
  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

  const renderLinkIcon = (): ReactNode => {
    return (
      <NavLink className="LeftSubmenuItemLink__Linked" to={link}>
        <Icon icon={IconType.link} size={18} />
      </NavLink>
    );
  };

  return (
    <NavLink
      activeClassName="LeftSubmenuItemLink--active"
      className={clsx('LeftSubmenuItemLink', {
        'LeftSubmenuItemLink--no-link': !link,
      })}
      isActive={getIsActive}
      key={key}
      to={to}
    >
      {link && renderLinkIcon()}
      <div className="LeftSubmenuItemLink__label">{label}</div>
    </NavLink>
  );
};

export default withRouter(LeftSubmenuItemLink);

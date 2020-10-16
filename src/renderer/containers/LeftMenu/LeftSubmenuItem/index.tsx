import React, {FC, ReactNode, useRef} from 'react';
import {NavLink, RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import './LeftSubmenuItem.scss';

export interface LeftSubmenuItemProps extends RouteComponentProps {
  baseUrl: string;
  key: string;
  label: ReactNode;
  relatedNodePath?: string;
  to: string;
}

const LeftSubmenuItem: FC<LeftSubmenuItemProps> = ({baseUrl, key, label, location, relatedNodePath, to}) => {
  const history = useHistory();
  const linkIconRef = useRef<HTMLDivElement>(null);

  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

  const handleLinkIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!relatedNodePath) return;
    e.preventDefault();
    history.push(relatedNodePath);
    linkIconRef.current?.blur();
  };

  const renderLinkIcon = (): ReactNode => {
    if (!relatedNodePath) return null;
    return (
      <Icon
        className="LeftSubmenuItem__chain-link-icon"
        icon={IconType.link}
        onClick={handleLinkIconClick}
        ref={linkIconRef}
        size={20}
        totalSize={20}
      />
    );
  };

  return (
    <NavLink
      activeClassName="LeftSubmenuItem--active"
      className={clsx('LeftSubmenuItem', {
        'LeftSubmenuItem--has-related-node': !!relatedNodePath,
      })}
      isActive={getIsActive}
      key={key}
      to={to}
    >
      {renderLinkIcon()}
      <div className="LeftSubmenuItem__label">{label}</div>
    </NavLink>
  );
};

export default withRouter(LeftSubmenuItem);

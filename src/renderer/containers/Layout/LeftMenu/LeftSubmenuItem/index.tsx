import React, {FC, ReactNode, useRef} from 'react';
import {NavLink, RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import clsx from 'clsx';
import {Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

import './LeftSubmenuItem.scss';

export interface LeftSubmenuItemProps extends RouteComponentProps {
  baseUrl: string;
  className?: string;
  key: string;
  label: ReactNode;
  relatedNodePath?: string;
  to: string;
}

const LeftSubmenuItem: FC<LeftSubmenuItemProps> = ({baseUrl, className, key, label, location, relatedNodePath, to}) => {
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
        className={clsx('LeftSubmenuItem__chain-link-icon', {
          ...bemify(className, '__chain-link-icon'),
        })}
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
      activeClassName={clsx('LeftSubmenuItem--active', {...bemify(className, '--active')})}
      className={clsx('LeftSubmenuItem', className, {
        'LeftSubmenuItem--has-related-node': !!relatedNodePath,
        ...bemify(className, '--has-related-node', !!relatedNodePath),
      })}
      isActive={getIsActive}
      key={key}
      to={to}
    >
      {renderLinkIcon()}
      <div className={clsx('LeftSubmenuItem__label', {...bemify(className, '__label')})}>{label}</div>
    </NavLink>
  );
};

export default withRouter(LeftSubmenuItem);

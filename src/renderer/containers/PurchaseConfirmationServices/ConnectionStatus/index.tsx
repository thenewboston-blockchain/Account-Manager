import React, {FC, useMemo} from 'react';
import clsx from 'clsx';
import {Icon, IconType} from '@thenewboston/ui';

import {ValidatorConnectionStatus} from '../utils';
import './ConnectionStatus.scss';

interface ComponentProps {
  className?: string;
  showDescription?: boolean;
  status: ValidatorConnectionStatus;
}

const ConnectionStatus: FC<ComponentProps> = ({className, showDescription = false, status}) => {
  const {icon, mainTitle, subTitle} = useMemo(() => {
    if (status === ValidatorConnectionStatus.checking) {
      return {
        icon: IconType.sync,
        mainTitle: 'Checking Connection',
        subTitle: 'Please wait while we check the connection',
      };
    }
    if (status === ValidatorConnectionStatus.connected) {
      return {
        icon: IconType.lanConnect,
        mainTitle: 'Connected',
        subTitle: 'Purchase Confirmation Services below',
      };
    }
    return {
      icon: IconType.lanDisconnect,
      mainTitle: 'Not Connected',
      subTitle: 'Unable to connect to Confirmation Validator',
    };
  }, [status]);

  const renderIcon = () => {
    const size = showDescription ? 32 : 22;
    return (
      <Icon
        className={clsx('ConnectionStatus__icon', {
          'ConnectionStatus__icon--spin': status === ValidatorConnectionStatus.checking,
        })}
        icon={icon}
        size={size}
        totalSize={size}
      />
    );
  };

  if (showDescription) {
    return (
      <div className={clsx('ConnectionStatus--subtitled', `ConnectionStatus--${status}`)}>
        {renderIcon()}
        <div>
          <div className="ConnectionStatus__main-title--subtitled">{mainTitle}</div>
          <div className="ConnectionStatus__sub-title">{subTitle}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('ConnectionStatus', `ConnectionStatus--${status}`, className)}>
      {renderIcon()}
      <div className="ConnectionStatus__main-title">{mainTitle}</div>
    </div>
  );
};

export default ConnectionStatus;

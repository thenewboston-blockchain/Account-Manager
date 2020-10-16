import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import './ConnectionStatus.scss';

export type Status = 'checking' | 'connected' | 'not-connected';

interface ComponentProps {
  status: Status;
}

const ConnectionStatus: FC<ComponentProps> = ({status}) => {
  const renderConnectionStatusBadge = (): ReactNode => {
    let icon;
    let mainTitle;
    let subTitle;

    if (status === 'checking') {
      icon = IconType.sync;
      mainTitle = 'Checking Connection';
      subTitle = 'Please wait while we check the connection';
    } else if (status === 'connected') {
      icon = IconType.lanConnect;
      mainTitle = 'Connected';
      subTitle = 'Purchase Confirmation Services below';
    } else {
      icon = IconType.lanDisconnect;
      mainTitle = 'Not Connected';
      subTitle = 'Unable to connect to Confirmation Validator';
    }

    return (
      <div className="ConnectionStatus__badge">
        <div>
          <Icon
            className={clsx('ConnectionStatus__icon', {
              'ConnectionStatus__icon--spin': status === 'checking',
            })}
            icon={icon}
            size={32}
            totalSize={32}
          />
        </div>
        <div>
          <div className="ConnectionStatus__main-title">{mainTitle}</div>
          <div className="ConnectionStatus__sub-title">{subTitle}</div>
        </div>
      </div>
    );
  };

  return <div className={clsx('ConnectionStatus', `ConnectionStatus--${status}`)}>{renderConnectionStatusBadge()}</div>;
};

export default ConnectionStatus;

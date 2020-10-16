import React, {FC, memo} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import {getCustomClassNames} from '@renderer/utils/components';

import './StatusBadge.scss';

interface ComponentProps {
  className?: string;
  status: 'active' | 'alert' | 'inactive';
}

const StatusBadge: FC<ComponentProps> = ({className, status}) => {
  const icon = status === 'inactive' ? IconType.checkboxBlankCircleOutline : IconType.checkboxBlankCircle;

  return (
    <Icon
      className={clsx('StatusBadge', `StatusBadge--${status}`, className, {
        ...getCustomClassNames(className, `--${status}`, true),
      })}
      icon={icon}
      size={8}
      totalSize={8}
    />
  );
};

export default memo(StatusBadge);

import React, {FC, memo} from 'react';
import clsx from 'clsx';

import Icon2, {IconType} from '@renderer/components/Icon2';
import {getCustomClassNames} from '@renderer/utils/components';

import './StatusBadge.scss';

interface ComponentProps {
  className?: string;
  status: 'active' | 'alert' | 'inactive';
}

const StatusBadge: FC<ComponentProps> = ({className, status}) => {
  const icon = status === 'inactive' ? IconType.checkboxBlankCircleOutline : IconType.checkboxBlankCircle;

  return (
    <Icon2
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

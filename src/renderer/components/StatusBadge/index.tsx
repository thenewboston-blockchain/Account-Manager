import React, {FC, memo} from 'react';
import clsx from 'clsx';
import {Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

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
        ...bemify(className, `--${status}`),
      })}
      icon={icon}
      size={8}
      totalSize={8}
    />
  );
};

export default memo(StatusBadge);

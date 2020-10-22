import React, {FC, useMemo} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import {getCustomClassNames} from '@renderer/utils/components';

import './Toast.scss';

export type ToastType = 'success' | 'warning';

interface ComponentProps {
  className?: string;
  type: ToastType;
}

const Toast: FC<ComponentProps> = ({children, className, type = 'warning'}) => {
  const iconType = useMemo<IconType>(() => {
    switch (type) {
      case 'success':
        return IconType.thumbsUp;
      default:
        return IconType.alertCircleOutline;
    }
  }, [type]);

  return (
    <div
      className={clsx('Toast', className, {
        [`Toast--${type}`]: true,
        ...getCustomClassNames(className, `--${type}`, true),
      })}
    >
      <Icon
        className={clsx('Toast__icon', {
          [`Toast__icon--${type}`]: true,
          ...getCustomClassNames(className, '__icon', true),
          ...getCustomClassNames(className, `__icon--${type}`, true),
        })}
        icon={iconType}
      />
      <div className={clsx('Toast__text', {...getCustomClassNames(className, '__text', true)})}>{children}</div>
    </div>
  );
};

export default Toast;

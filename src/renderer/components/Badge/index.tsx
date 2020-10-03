import React, {FC} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import {getCustomClassNames} from '@renderer/utils/components';

import './Badge.scss';

interface ComponentProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  iconType?: IconType;
  onClick?(): void;
  text?: number | string;
}

const Badge: FC<ComponentProps> = ({className, color = 'primary', iconType, onClick, text}) => {
  return (
    <span
      onClick={onClick}
      className={clsx('Badge', `Badge--${color}`, className, {
        ...getCustomClassNames(className, `--${color}`, true),
        'Badge--clickable': onClick,
      })}
    >
      {iconType && <Icon className={clsx('Bagde-icon', className)} icon={iconType} size={22} />}
      {text}
    </span>
  );
};

export default Badge;

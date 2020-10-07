import React, {FC} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

import './Badge.scss';

interface ComponentProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-light';
  text?: number | string;
}

const Badge: FC<ComponentProps> = ({className, color = 'primary', text}) => {
  return (
    <span
      className={clsx('Badge', `Badge--${color}`, className, {
        ...getCustomClassNames(className, `--${color}`, true),
      })}
    >
      {text}
    </span>
  );
};

export default Badge;

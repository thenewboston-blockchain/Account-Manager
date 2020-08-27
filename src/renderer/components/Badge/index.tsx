import React, {FC} from 'react';
import clsx from 'clsx';

import './Badge.scss';
import {getCustomClassNames} from '@renderer/utils/components';

interface ComponentProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  text: number | string;
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

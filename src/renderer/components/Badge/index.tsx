import React, {FC} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import './Badge.scss';

interface ComponentProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-light';
  text: string;
}

const Badge: FC<ComponentProps> = ({className, color = 'primary', text}) => {
  return (
    <span
      className={clsx('Badge', `Badge--${color}`, className, {
        ...bemify(className, `--${color}`),
      })}
    >
      {text}
    </span>
  );
};

export default Badge;

import React, {FC} from 'react';
import clsx from 'clsx';

import './Button.scss';

interface ComponentProps {
  className?: string;
  color?: 'primary' | 'accent1' | 'accent2';
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
}

const Button: FC<ComponentProps> = ({
  children,
  color = 'primary',
  className,
  disabled,
  variant = 'contained',
  ...props
}) => {
  return (
    <button
      className={clsx('Button', {[`Button--${color}`]: !!color, [`Button--${variant}`]: !!variant}, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

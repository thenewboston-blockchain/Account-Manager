import React, {FC} from 'react';
import clsx from 'clsx';

import {GenericFunction} from '@renderer/types/generics';

import './Button.scss';

interface ComponentProps {
  className?: string;
  color?: 'primary' | 'accent1' | 'accent2';
  disabled?: boolean;
  onClick?: GenericFunction;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'contained' | 'outlined';
}

const Button: FC<ComponentProps> = ({
  children,
  color = 'primary',
  className,
  disabled,
  onClick,
  type = 'button',
  variant = 'contained',
}) => {
  return (
    <button
      className={clsx('Button', `Button--${variant}`, `Button--${color}`, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

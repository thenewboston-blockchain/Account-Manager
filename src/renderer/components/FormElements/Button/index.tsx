import React, {FC} from 'react';
import clsx from 'clsx';

import './Button.scss';

export interface ComponentProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'contained' | 'link' | 'outlined';
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
      className={clsx('Button', `Button--${variant}`, `Button--${color}`, {'Button--disabled': disabled}, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

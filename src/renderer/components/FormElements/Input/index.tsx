import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';

import './Input.scss';

export interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  name?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  type?: 'text' | 'number';
  value: string;
}

const Input: FC<BaseInputProps> = ({
  className,
  disabled,
  error,
  name,
  onBlur,
  onChange,
  placeholder,
  type = 'text',
  value,
}) => {
  return (
    <input
      className={clsx('Input', className, {'Input--error': error})}
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default Input;

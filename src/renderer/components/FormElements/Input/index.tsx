import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';

import './Input.scss';

export interface InputProps {
  className?: string;
  error?: boolean;
  name?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  type?: 'text' | 'number';
  value: string;
}

const Input: FC<InputProps> = ({className, error, name, onBlur, onChange, placeholder, type = 'text', value}) => {
  return (
    <input
      className={clsx('Input', {error}, className)}
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

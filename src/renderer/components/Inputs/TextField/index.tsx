import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';

import './TextField.scss';

export interface TextFieldProps {
  className?: string;
  name?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  type?: 'text' | 'number';
  value: string;
}

const TextField: FC<TextFieldProps> = ({className, name, onBlur, onChange, placeholder, type = 'text', value}) => {
  return (
    <input
      className={clsx('TextField', className)}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default TextField;

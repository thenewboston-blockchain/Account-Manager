import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';

export interface InputFieldProps {
  className?: string;
  error?: boolean;
  name?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  type?: 'text' | 'number';
  value: string;
}

const InputField: FC<InputFieldProps> = ({
  className,
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
      className={clsx('InputField', {error}, className)}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default InputField;

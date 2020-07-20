import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';

import './InputTextArea.scss';

export interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  name?: string;
  onBlur?(e: FocusEvent<HTMLTextAreaElement>): void;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
  placeholder?: string;
  type?: 'text' | 'number';
  value: string;
}

const InputTextArea: FC<BaseInputProps> = ({
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
    <textarea
      className={clsx('InputTextArea', {error}, className)}
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default InputTextArea;

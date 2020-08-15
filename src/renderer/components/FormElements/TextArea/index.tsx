import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';
import './TextArea.scss';

export interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  name?: string;
  onBlur?(e: FocusEvent<HTMLTextAreaElement>): void;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
  placeholder?: string;
  value: string;
}

const InputTextArea: FC<BaseInputProps> = ({
  className,
  disabled = false,
  error = false,
  name,
  onBlur,
  onChange,
  placeholder = 'Enter',
  value,
}) => {
  return (
    <textarea
      className={clsx('TextArea', className, {
        'TextArea--error': error,
        ...getCustomClassNames(className, '--error', error),
      })}
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

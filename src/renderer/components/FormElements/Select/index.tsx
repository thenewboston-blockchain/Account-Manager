import React, {FC} from 'react';
import ReactSelect, {ActionMeta, FocusEventHandler} from 'react-select';
import {ValueType} from 'react-select/src/types';
import clsx from 'clsx';

import {SelectOption} from '@renderer/types/inputs';

import './Select.scss';

export interface SelectProps {
  className?: string;
  options: SelectOption[];
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(value: ValueType<SelectOption>, actionMeta?: ActionMeta<SelectOption>): void;
  placeholder?: string;
  value: SelectOption | null;
}

const Select: FC<SelectProps> = ({className, options, name, onBlur, onChange, placeholder, value}) => {
  return (
    <ReactSelect
      className={clsx('Select', className)}
      classNamePrefix="Select"
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Select;

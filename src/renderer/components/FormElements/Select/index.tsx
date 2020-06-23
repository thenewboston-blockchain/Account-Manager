import React, {FC, ReactNode} from 'react';
import ReactSelect, {ActionMeta, FocusEventHandler, FormatOptionLabelMeta} from 'react-select';
import {ValueType} from 'react-select/src/types';
import clsx from 'clsx';

import {SelectOption} from '@renderer/types/forms';

import './Select.scss';

export interface SelectProps {
  className?: string;
  error?: boolean;
  isSearchable?: boolean;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(value: ValueType<SelectOption>, actionMeta?: ActionMeta<SelectOption>): void;
  options: SelectOption[];
  placeholder?: string;
  value: SelectOption | null;
}

interface ExtendedSelectProps extends SelectProps {
  formatOptionLabel?(option: SelectOption, labelMeta: FormatOptionLabelMeta<SelectOption>): ReactNode;
}

const Select: FC<ExtendedSelectProps> = ({
  className,
  error,
  formatOptionLabel,
  isSearchable = true,
  options,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
}) => {
  const getOptionLabel = ({label, value}: SelectOption): string => label || value;

  return (
    <ReactSelect
      className={clsx('Select', {error}, className)}
      classNamePrefix="Select"
      formatOptionLabel={formatOptionLabel}
      getOptionLabel={getOptionLabel}
      isSearchable={isSearchable}
      menuPortalTarget={document.getElementById('dropdown-root')}
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

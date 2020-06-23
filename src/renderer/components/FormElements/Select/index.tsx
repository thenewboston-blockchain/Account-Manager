import React, {FC, ReactNode} from 'react';
import ReactSelect, {ActionMeta, FocusEventHandler, FormatOptionLabelMeta} from 'react-select';
import {ValueType} from 'react-select/src/types';
import clsx from 'clsx';

import {SelectOption} from '@renderer/types/forms';

import './Select.scss';

export interface BaseSelectProps {
  className?: string;
  error?: boolean;
  isSearchable?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

interface ComponentProps extends BaseSelectProps {
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(value: ValueType<SelectOption>, actionMeta?: ActionMeta<SelectOption>): void;
  value?: SelectOption | null;
}

interface ExtendedSelectProps extends ComponentProps {
  filterOption?(option: SelectOption, rawInput: string): boolean;
  formatOptionLabel?(option: SelectOption, labelMeta: FormatOptionLabelMeta<SelectOption>): ReactNode;
}

const Select: FC<ExtendedSelectProps> = ({
  className,
  error,
  filterOption,
  formatOptionLabel,
  isSearchable = true,
  name,
  onBlur,
  onChange,
  options,
  placeholder,
  value,
}) => {
  const getOptionLabel = ({label, value}: SelectOption): string => label || value;

  return (
    <ReactSelect
      className={clsx('Select', {error}, className)}
      classNamePrefix="Select"
      filterOption={filterOption}
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

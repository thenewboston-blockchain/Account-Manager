import React, {FC, ReactNode, useMemo} from 'react';
import ReactSelect, {ActionMeta, FocusEventHandler, FormatOptionLabelMeta} from 'react-select';
import {ValueType} from 'react-select/src/types';
import clsx from 'clsx';

import {SelectOption} from '@renderer/types/forms';

import './Select.scss';

export interface BaseSelectProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  isSearchable?: boolean;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(value: ValueType<SelectOption>, actionMeta?: ActionMeta<SelectOption>): void;
  options: SelectOption[];
  placeholder?: string;
  value?: SelectOption | null;
}

interface ComponentProps extends BaseSelectProps {
  filterOption?(option: SelectOption, rawInput: string): boolean;
  formatOptionLabel?(option: SelectOption, labelMeta: FormatOptionLabelMeta<SelectOption>): ReactNode;
}

const Select: FC<ComponentProps> = ({
  className,
  disabled,
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
  const formattedOptions = useMemo(
    () => options.map(({disabled, label, value}) => ({isDisabled: disabled, label, value})),
    [options],
  );

  const getOptionLabel = ({label, value}: SelectOption): string => label || value;

  return (
    <ReactSelect
      className={clsx('Select', {error}, className)}
      classNamePrefix="Select"
      filterOption={filterOption}
      formatOptionLabel={formatOptionLabel}
      getOptionLabel={getOptionLabel}
      isDisabled={disabled}
      isSearchable={isSearchable}
      menuPortalTarget={document.getElementById('dropdown-root')}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      options={formattedOptions}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Select;

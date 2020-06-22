import React, {FC, ReactNode} from 'react';
import ReactSelect, {ActionMeta, FocusEventHandler, FormatOptionLabelMeta, OptionTypeBase} from 'react-select';
import {ValueType} from 'react-select/src/types';
import clsx from 'clsx';

import {CustomSelectOption} from '@renderer/types/forms';

export type GenericOptionType = CustomSelectOption<OptionTypeBase>;

import './Select.scss';

export interface SelectProps {
  className?: string;
  error?: boolean;
  formatOptionLabel?(option: GenericOptionType, labelMeta: FormatOptionLabelMeta<GenericOptionType>): ReactNode;
  isSearchable?: boolean;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(value: ValueType<GenericOptionType>, actionMeta?: ActionMeta<GenericOptionType>): void;
  options: GenericOptionType[];
  placeholder?: string;
  value: GenericOptionType | null;
}

const Select: FC<SelectProps> = ({
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
  return (
    <ReactSelect
      className={clsx('Select', {error}, className)}
      classNamePrefix="Select"
      formatOptionLabel={formatOptionLabel}
      menuIsOpen
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

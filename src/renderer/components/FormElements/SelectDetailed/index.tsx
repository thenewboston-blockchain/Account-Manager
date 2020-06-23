import React, {FC} from 'react';
import {ActionMeta, FocusEventHandler, FormatOptionLabelMeta} from 'react-select';
import {ValueType} from 'react-select/src/types';
import clsx from 'clsx';

import {Select} from '@renderer/components/FormElements';
import {BaseSelectProps} from '@renderer/components/FormElements/Select';
import {SelectOption} from '@renderer/types/forms';

import './SelectDetailed.scss';

interface ComponentProps extends BaseSelectProps {
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(value: ValueType<SelectOption>, actionMeta?: ActionMeta<SelectOption>): void;
  value?: SelectOption | null;
}

const filterOption = ({value, label}: SelectOption, rawInput: string): boolean => {
  const rawInputLowercase = rawInput.toLocaleLowerCase();
  return (
    value.toLocaleLowerCase().includes(rawInputLowercase) ||
    (label ? label.toLocaleLowerCase().includes(rawInputLowercase) : false)
  );
};

const formatOptionLabel = ({value, label}: SelectOption, {context}: FormatOptionLabelMeta<SelectOption>) => {
  if (context === 'value') {
    return label ? `${label} (${value})` : value;
  }

  return (
    <div className="SelectDetailed__option">
      {label ? <div className="SelectDetailed__option-label">{label}</div> : null}
      <div className="SelectDetailed__option-value">{value}</div>
    </div>
  );
};

const SelectDetailed: FC<ComponentProps> = ({
  className,
  error,
  isSearchable,
  name,
  onBlur,
  onChange,
  options,
  placeholder,
  value,
}) => {
  return (
    <Select
      className={clsx('SelectDetailed', className)}
      error={error}
      filterOption={filterOption}
      formatOptionLabel={formatOptionLabel}
      isSearchable={isSearchable}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default SelectDetailed;

import React, {FC} from 'react';
import {FormatOptionLabelMeta} from 'react-select';
import clsx from 'clsx';

import {Select, SelectProps} from '@renderer/components/FormElements';
import {SelectOption} from '@renderer/types/forms';

import './SelectDetailed.scss';

type SelectDetailedProps = SelectProps;

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

const SelectDetailed: FC<SelectDetailedProps> = ({
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

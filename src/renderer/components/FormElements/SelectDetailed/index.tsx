import React, {FC} from 'react';
import {FormatOptionLabelMeta} from 'react-select';
import clsx from 'clsx';

import {BaseSelectProps, Select} from '@renderer/components/FormElements';
import {SelectOption} from '@renderer/types/forms';

import './SelectDetailed.scss';

const VALUE_LENGTH = 64;

const filterOption = ({label, value}: SelectOption, rawInput: string): boolean => {
  const rawInputLowercase = rawInput.toLocaleLowerCase();
  return (
    value.toLocaleLowerCase().includes(rawInputLowercase) ||
    (label ? label.toLocaleLowerCase().includes(rawInputLowercase) : false)
  );
};

const formatOptionLabel = ({value, label}: SelectOption, {context}: FormatOptionLabelMeta<SelectOption>) => {
  if (context === 'value') {
    return formatOptionValue(value);
  }

  return (
    <>
      {label ? <div className="SelectDetailed__option-label">{label}</div> : null}
      <div className="SelectDetailed__option-value">{formatOptionValue(value)}</div>
    </>
  );
};

const formatOptionValue = (value: string) => `${value.slice(0, VALUE_LENGTH / 2)}\n${value.slice(VALUE_LENGTH / 2)}`;

const SelectDetailed: FC<BaseSelectProps> = ({...baseSelectProps}) => {
  const {className} = baseSelectProps;

  return (
    <Select
      {...baseSelectProps}
      className={clsx('SelectDetailed', className)}
      filterOption={filterOption}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default SelectDetailed;

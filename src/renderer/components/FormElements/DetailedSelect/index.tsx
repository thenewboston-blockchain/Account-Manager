import React, {FC} from 'react';
import {FormatOptionLabelMeta} from 'react-select';
import clsx from 'clsx';

import {Select, SelectProps} from '@renderer/components/FormElements';
import {SelectOption} from '@renderer/types/forms';

import './DetailedSelect.scss';

type DetailedSelect = SelectProps;

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
    <div className="DetailedSelect__option">
      {label ? <div className="DetailedSelect__option-label">{label}</div> : null}
      <div className="DetailedSelect__option-value">{value}</div>
    </div>
  );
};

const DetailedSelect: FC<DetailedSelect> = ({className, ...SelectProps}) => {
  return (
    <Select
      className={clsx('DetailedSelect', className)}
      filterOption={filterOption}
      formatOptionLabel={formatOptionLabel}
      {...SelectProps}
    />
  );
};

export default DetailedSelect;

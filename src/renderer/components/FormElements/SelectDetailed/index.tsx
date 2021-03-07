/* eslint-disable react/jsx-props-no-spreading */

import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import {BaseSelectProps, Select} from '@renderer/components/FormElements';
import {InputOption} from '@renderer/types';

import './SelectDetailed.scss';

const filterOption = ({label, value}: InputOption, rawInput: string): boolean => {
  const rawInputLowercase = rawInput.toLocaleLowerCase();
  return (
    value.toLocaleLowerCase().includes(rawInputLowercase) ||
    (label ? label.toLocaleLowerCase().includes(rawInputLowercase) : false)
  );
};

const formatOptionLabel = ({value, label}: InputOption): ReactNode => {
  return (
    <>
      {label ? <div className="SelectDetailed__option-label">{label}</div> : null}
      <div className="SelectDetailed__option-value">{value}</div>
    </>
  );
};

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

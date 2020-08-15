import React, {FC, ReactNode, useMemo} from 'react';
import ReactSelect, {ActionMeta, FocusEventHandler, FormatOptionLabelMeta} from 'react-select';
import {ValueType} from 'react-select/src/types';
import clsx from 'clsx';

import {InputOption} from '@renderer/types';
import {getCustomClassNames} from '@renderer/utils/components';

import './Select.scss';

export interface BaseSelectProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  isSearchable?: boolean;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(value: ValueType<InputOption>, actionMeta?: ActionMeta<InputOption>): void;
  options: InputOption[];
  placeholder?: string;
  value?: InputOption | null;
}

interface ComponentProps extends BaseSelectProps {
  filterOption?(option: InputOption, rawInput: string): boolean;
  formatOptionLabel?(option: InputOption, labelMeta: FormatOptionLabelMeta<InputOption>): ReactNode;
}

const Select: FC<ComponentProps> = ({
  className,
  disabled = false,
  error = false,
  filterOption,
  formatOptionLabel,
  isSearchable = true,
  name,
  onBlur,
  onChange,
  options,
  placeholder = 'Select',
  value,
}) => {
  const formattedOptions = useMemo(
    () =>
      options.map(({disabled: optionDisabled, label, value: optionValue}) => ({
        isDisabled: optionDisabled,
        label,
        value: optionValue,
      })),
    [options],
  );

  const getOptionLabel = ({label, value: valueParam}: InputOption): string => label || valueParam;

  return (
    <ReactSelect
      className={clsx('Select', className, {
        'Select--error': error,
        ...getCustomClassNames(className, '--error', error),
      })}
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

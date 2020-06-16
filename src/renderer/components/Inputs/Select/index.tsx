import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';

import {SelectMenuItem} from '@renderer/types/inputs';

import './Select.scss';

export interface SelectProps {
  className?: string;
  menuItems: SelectMenuItem[];
  name?: string;
  onBlur?(e: FocusEvent<HTMLSelectElement>): void;
  onChange?(e: ChangeEvent<HTMLSelectElement>): void;
  placeholder?: string;
  required?: boolean;
  value: string;
}

const Select: FC<SelectProps> = ({className, menuItems, name, onBlur, onChange, placeholder, required, value}) => {
  return (
    <select
      className={clsx('Select', className)}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      value={value}
    >
      {menuItems.map(({label, value}) => (
        <option className="Select__option" key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;

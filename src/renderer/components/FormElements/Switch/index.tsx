import React, {FC, SyntheticEvent} from 'react';
import ReactSwitch from 'react-switch';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import './Switch.scss';

export interface BaseSwitchProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  name?: string;
  onChange(checked: boolean, e: MouseEvent | SyntheticEvent<MouseEvent | KeyboardEvent, Event>): void;
}

const Switch: FC<BaseSwitchProps> = ({checked, className, disabled, id, label, name, onChange}) => {
  const switchComponent = (
    <ReactSwitch
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      checked={checked}
      checkedIcon={false}
      className={clsx('Switch', className)}
      disabled={disabled}
      handleDiameter={15}
      height={10}
      id={id}
      name={name}
      onChange={onChange}
      onColor="#b9daee"
      onHandleColor="#042235"
      uncheckedIcon={false}
      width={24}
    />
  );

  if (label) {
    return (
      <label
        className={clsx('Switch__label', {
          'Switch__label--disabled': disabled,
          ...bemify(className, '__label'),
          ...bemify(className, '__label--disabled', disabled),
        })}
        htmlFor={id}
      >
        {switchComponent}
        <span
          className={clsx('Switch__span', {
            ...bemify(className, '__span'),
          })}
        >
          {label}
        </span>
      </label>
    );
  }

  return switchComponent;
};

export default Switch;

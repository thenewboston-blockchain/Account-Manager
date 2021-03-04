import React, {FC, SyntheticEvent} from 'react';
import ReactSwitch from 'react-switch';
import clsx from 'clsx';

interface BaseSwitchProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  onChange(checked: boolean, e: MouseEvent | SyntheticEvent<MouseEvent | KeyboardEvent, Event>): void;
}

const Switch: FC<BaseSwitchProps> = ({checked, className, disabled, onChange}) => {
  return (
    <ReactSwitch
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      checked={checked}
      checkedIcon={false}
      className={clsx('Switch', className)}
      disabled={disabled}
      handleDiameter={15}
      height={10}
      onChange={onChange}
      onColor="#b9daee"
      onHandleColor="#042235"
      uncheckedIcon={false}
      width={24}
    />
  );
};

export default Switch;

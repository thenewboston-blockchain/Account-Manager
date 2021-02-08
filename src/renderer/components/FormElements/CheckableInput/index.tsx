import React, {FC, useEffect, useMemo, useRef} from 'react';
import clsx from 'clsx';
import {Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

import './CheckableInput.scss';

export interface BaseCheckableInputProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  name?: string;
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onKeyDown?(e?: React.KeyboardEvent<HTMLDivElement>): void;
  size?: number;
  totalSize?: number;
  unfocusable?: boolean;
  value: string;
}

export interface CheckableInputType {
  type: 'checkbox' | 'radio';
}

const CheckableInput: FC<BaseCheckableInputProps & CheckableInputType> = ({
  checked,
  className,
  disabled = false,
  error = false,
  focused = false,
  name,
  onClick,
  onKeyDown,
  size,
  totalSize = size,
  unfocusable = false,
  type,
  value,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focused) {
      iconRef.current?.focus();
    }
  }, [focused, iconRef]);

  const checkedIcon = useMemo(() => {
    if (type === 'radio') return IconType.radioboxMarked;
    return IconType.checkboxMarked;
  }, [type]);

  const uncheckedIcon = useMemo(() => {
    if (type === 'radio') return IconType.radioboxBlank;
    return IconType.checkboxBlankOutline;
  }, [type]);

  const handleClick = onClick
    ? (e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        // blur if clicked. Don't blur if you pressed Enter on it.
        if (e?.detail === 1) {
          iconRef.current?.blur();
        }
        onClick(e);
      }
    : undefined;

  return (
    <>
      <Icon
        className={clsx('CheckableInput', className, {
          'CheckableInput--checked': checked,
          'CheckableInput--error': error,
          ...bemify(className, '--checked', checked),
          ...bemify(className, '--error', error),
        })}
        disabled={disabled}
        icon={checked ? checkedIcon : uncheckedIcon}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        ref={iconRef}
        size={size}
        totalSize={totalSize}
        unfocusable={unfocusable}
      />
      <input
        className="CheckableInput__input"
        checked={checked}
        disabled={disabled}
        id={name || value}
        name={name || value}
        readOnly
        type={type}
        value={value}
      />
    </>
  );
};

export default CheckableInput;

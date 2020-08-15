import React, {FC} from 'react';
import clsx from 'clsx';

import Icon, {IconType} from '@renderer/components/Icon';
import {getCustomClassNames} from '@renderer/utils/components';

import './Radio.scss';

export interface BaseRadioProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  name?: string;
  onClick?(): void;
  size?: number | string;
  value: string;
}

const Radio: FC<BaseRadioProps> = ({
  checked,
  className,
  disabled = false,
  error = false,
  name,
  onClick,
  size,
  value,
}) => {
  return (
    <>
      <Icon
        className={clsx('Radio', className, {
          'Radio--checked': checked,
          'Radio--error': error,
          ...getCustomClassNames(className, '--checked', checked),
          ...getCustomClassNames(className, '--error', error),
        })}
        disabled={disabled}
        icon={checked ? IconType.radioboxMarked : IconType.radioboxBlank}
        onClick={onClick}
        size={size}
      />
      <input
        className="Radio__input"
        checked={checked}
        disabled={disabled}
        id={name || value}
        name={name || value}
        readOnly
        type="radio"
        value={value}
      />
    </>
  );
};

export default Radio;

import React, {ChangeEvent, FC} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {getCustomClassNames} from '@renderer/utils/components';
import './Radio.scss';

export interface BaseRadioProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const Radio: FC<BaseRadioProps> = ({checked, className, disabled, error = false, onChange = noop}) => (
  <input
    checked={checked}
    className={clsx('Radio', className, {'Radio--error': error, ...getCustomClassNames(className, '--error', error)})}
    disabled={disabled}
    onChange={onChange}
    type="radio"
  />
);

export default Radio;

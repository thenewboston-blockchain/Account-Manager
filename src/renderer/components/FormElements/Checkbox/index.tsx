/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import clsx from 'clsx';

import CheckableInput, {BaseCheckableInputProps} from '../CheckableInput';

export type BaseCheckboxProps = BaseCheckableInputProps;

const Checkbox: FC<BaseCheckboxProps> = ({className, size = 22, ...props}) => {
  return (
    <CheckableInput
      {...props}
      className={clsx('Checkbox', className)}
      size={size}
      totalSize={size + 2}
      type="checkbox"
    />
  );
};

export default Checkbox;

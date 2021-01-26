/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import clsx from 'clsx';

import CheckableInput, {BaseCheckableInputProps} from '../CheckableInput';

export type BaseRadioProps = BaseCheckableInputProps;

const Radio: FC<BaseRadioProps> = ({className, size = 24, ...props}) => {
  return <CheckableInput {...props} className={clsx('Radio', className)} size={size} type="radio" />;
};

export default Radio;

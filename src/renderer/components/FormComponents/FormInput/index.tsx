/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import {Field} from 'formik';
import clsx from 'clsx';

import {BaseInputProps, Input} from '@renderer/components/FormElements';
import {useFormContext} from '@renderer/hooks';
import {BaseFormComponentProps} from '@renderer/types';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms/formComponents';

type ComponentProps = BaseFormComponentProps<BaseInputProps>;

const FormInput: FC<ComponentProps> = ({
  hideErrorBlock = false,
  hideErrorText = false,
  label,
  required,
  ...baseInputProps
}) => {
  const {className, name} = baseInputProps;
  const {errors, touched} = useFormContext();
  const error = !!errors[name] && !!touched[name];

  return (
    <div className={clsx('FormInput FormFieldComponent', className)}>
      {renderFormLabel({className, label, name, required})}
      <Field {...baseInputProps} as={Input} className="FormField" error={error} required={required} />
      {hideErrorBlock ? null : renderFormError({className, hideErrorText, name})}
    </div>
  );
};

export default FormInput;

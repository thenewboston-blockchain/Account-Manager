/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import {Field} from 'formik';
import clsx from 'clsx';

import {BaseInputProps, TextArea} from '@renderer/components/FormElements';
import {useFormContext} from '@renderer/hooks';
import {BaseFormComponentProps} from '@renderer/types';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms/formComponents';

type ComponentProps = BaseFormComponentProps<BaseInputProps>;

const FormTextArea: FC<ComponentProps> = ({hideErrorText = false, label, required, ...baseInputProps}) => {
  const {className, name} = baseInputProps;
  const {errors, touched} = useFormContext();
  const error = !!errors[name] && !!touched[name];

  return (
    <div className={clsx('FormTextArea FormFieldComponent', className)}>
      {renderFormLabel({className, label, name, required})}
      <Field {...baseInputProps} as={TextArea} className="FormField" error={error} required={required} />
      {renderFormError({className, hideErrorText, name})}
    </div>
  );
};

export default FormTextArea;

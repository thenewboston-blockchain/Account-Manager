import React, {FC} from 'react';
import {Field} from 'formik';
import clsx from 'clsx';

import {InputTextArea, BaseInputProps} from '@renderer/components/FormElements';
import useFormContext from '@renderer/hooks/useFormContext';
import {BaseFormComponentProps} from '@renderer/types/forms';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = BaseFormComponentProps<BaseInputProps>;

const FormTextArea: FC<ComponentProps> = ({hideError = false, label, required, ...baseInputProps}) => {
  const {className, name} = baseInputProps;
  const {error} = useFormContext(name);

  return (
    <div className={clsx('FormTextArea FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <Field {...baseInputProps} as={InputTextArea} className="FormField" error={error} required={required} />
      {hideError ? null : renderFormError(name)}
    </div>
  );
};

export default FormTextArea;

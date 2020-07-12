import React, {FC} from 'react';
import {Field} from 'formik';
import clsx from 'clsx';

import {Input, BaseInputProps} from '@renderer/components/FormElements';
import useFormContext from '@renderer/hooks/useFormContext';
import {BaseFormComponentProps} from '@renderer/types/forms';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = BaseFormComponentProps<BaseInputProps>;

const FormInput: FC<ComponentProps> = ({label, required, ...baseInputProps}) => {
  const {className, name} = baseInputProps;
  const {error} = useFormContext(name);

  return (
    <div className={clsx('FormInput FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <Field {...baseInputProps} as={Input} className="FormField" error={error} required={required} />
      {renderFormError(name)}
    </div>
  );
};

export default FormInput;

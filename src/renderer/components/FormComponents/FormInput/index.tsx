import React, {FC} from 'react';
import {Field} from 'formik';
import clsx from 'clsx';

import {Input} from '@renderer/components/FormElements';
import useFormContext from '@renderer/hooks/useFormContext';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = {
  className?: string;
  error?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number';
};

const FormInput: FC<ComponentProps> = ({className, label, name, placeholder, required, type}) => {
  const {error} = useFormContext(name);

  return (
    <div className={clsx('FormInput FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <Field
        as={Input}
        className="FormField"
        error={error}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {renderFormError(name)}
    </div>
  );
};

export default FormInput;

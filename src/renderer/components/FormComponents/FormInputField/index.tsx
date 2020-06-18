import React, {FC} from 'react';
import clsx from 'clsx';
import {ErrorMessage, Field, useFormikContext} from 'formik';

import {InputField, InputFieldProps} from '@renderer/components/FormElements';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {FormComponentBaseProps} from '@renderer/types/inputs';

type ComponentProps = FormComponentBaseProps<InputFieldProps>;

const FormInputField: FC<ComponentProps> = ({className, label, name, placeholder, required, type}) => {
  const {errors, touched} = useFormikContext<{[name: string]: string}>();
  const error = !!errors[name] && !!touched[name];

  return (
    <div className={clsx('FormField FormInputField', className)}>
      {label ? (
        <label htmlFor={name}>
          {label}
          {required ? <RequiredAsterisk /> : null}
        </label>
      ) : null}
      <Field as={InputField} error={error} name={name} placeholder={placeholder} required={required} type={type} />
      <span className="error">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default FormInputField;

import React, {FC} from 'react';
import clsx from 'clsx';
import {ErrorMessage, Field, useFormikContext} from 'formik';

import {TextField, TextFieldProps} from '@renderer/components/Inputs';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {FormikInputBaseProps} from '@renderer/types/inputs';

type ComponentProps = FormikInputBaseProps<TextFieldProps>;

const FormTextField: FC<ComponentProps> = ({className, label, name, placeholder, required, type}) => {
  const {errors, touched} = useFormikContext<{[name: string]: string}>();
  const error = !!errors[name] && !!touched[name];

  return (
    <div className={clsx('FormField FormTextField', className)}>
      {label ? (
        <label htmlFor={name}>
          {label}
          {required ? <RequiredAsterisk /> : null}
        </label>
      ) : null}
      <Field as={TextField} error={error} name={name} placeholder={placeholder} required={required} type={type} />
      <span className="error">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default FormTextField;

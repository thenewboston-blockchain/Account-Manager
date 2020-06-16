import React, {FC} from 'react';
import clsx from 'clsx';
import {ErrorMessage, Field} from 'formik';

import {TextField, TextFieldProps} from '@renderer/components/Inputs';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {FormikInputBaseProps} from '@renderer/types/inputs';

import './FormikTextField.scss';

type ComponentProps = FormikInputBaseProps<TextFieldProps>;

const FormikTextField: FC<ComponentProps> = ({className, label, name, placeholder, required, type}) => {
  return (
    <div className={clsx('FormikTextField', className)}>
      {label ? (
        <label className="FormikTextField__label" htmlFor={name}>
          {label}
          {required ? <RequiredAsterisk /> : null}
        </label>
      ) : null}
      <Field
        as={TextField}
        className="FormikTextField__input"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      <span className="FormikTextField__error">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default FormikTextField;

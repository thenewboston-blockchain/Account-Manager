import React, {ReactNode} from 'react';
import {ErrorMessage} from 'formik';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';

export const renderFormError = (name: string): ReactNode => (
  <span className="error">
    <ErrorMessage name={name} />
  </span>
);

export const renderFormLabel = (name: string, label?: string, required?: boolean): ReactNode =>
  label ? (
    <label htmlFor={name}>
      {label}
      {required ? <RequiredAsterisk /> : null}
    </label>
  ) : null;

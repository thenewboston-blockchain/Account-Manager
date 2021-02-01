import React, {ReactNode} from 'react';
import clsx from 'clsx';
import {ErrorMessage} from 'formik';

import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {getCustomClassNames} from '@renderer/utils/components';

export const renderFormError = ({
  className,
  hideErrorText,
  name,
}: {
  className?: string;
  hideErrorText?: boolean;
  name: string;
}): ReactNode => (
  <span
    className={clsx('FormFieldComponent__error-message', {...getCustomClassNames(className, '__error-message', true)})}
  >
    {hideErrorText ? null : <ErrorMessage name={name} />}
  </span>
);

export const renderFormLabel = ({
  className,
  label,
  name,
  required,
}: {
  className?: string;
  label?: string;
  name?: string;
  required?: boolean;
}): ReactNode =>
  label ? (
    <label
      className={clsx('FormFieldComponent__label', {...getCustomClassNames(className, '__label', true)})}
      htmlFor={name}
    >
      {label}
      {required ? <RequiredAsterisk /> : null}
    </label>
  ) : null;

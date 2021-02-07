import React, {ReactNode} from 'react';
import clsx from 'clsx';
import {ErrorMessage} from 'formik';
import {bemify} from '@thenewboston/utils';

import RequiredAsterisk from '@renderer/components/RequiredAsterisk';

export const renderFormError = ({
  className,
  hideErrorText,
  name,
}: {
  className?: string;
  hideErrorText?: boolean;
  name: string;
}): ReactNode => (
  <span className={clsx('FormFieldComponent__error-message', {...bemify(className, '__error-message')})}>
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
    <label className={clsx('FormFieldComponent__label', {...bemify(className, '__label')})} htmlFor={name}>
      {label}
      {required ? <RequiredAsterisk /> : null}
    </label>
  ) : null;

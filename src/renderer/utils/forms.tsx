import React, {ReactNode} from 'react';
import clsx from 'clsx';
import {ErrorMessage} from 'formik';

import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {getCustomClassNames} from '@renderer/utils/components';

export const renderFormError = (name: string, classNames: string | undefined): ReactNode => (
  <span
    className={clsx('FormFieldComponent__error-message', {...getCustomClassNames(classNames, '__error-message', true)})}
  >
    <ErrorMessage name={name} />
  </span>
);

export const renderFormLabel = (
  name: string,
  classNames: string | undefined,
  label?: string,
  required?: boolean,
): ReactNode =>
  label ? (
    <label
      className={clsx('FormFieldComponent__label', {...getCustomClassNames(classNames, '__label', true)})}
      htmlFor={name}
    >
      {label}
      {required ? <RequiredAsterisk /> : null}
    </label>
  ) : null;

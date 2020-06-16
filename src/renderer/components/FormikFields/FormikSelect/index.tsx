import React, {FC} from 'react';
import clsx from 'clsx';
import {ErrorMessage, Field} from 'formik';

import {Select, SelectProps} from '@renderer/components/Inputs';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {FormikInputBaseProps} from '@renderer/types/inputs';

import './FormikSelect.scss';

type ComponentProps = FormikInputBaseProps<SelectProps>;

const FormikSelect: FC<ComponentProps> = ({className, label, name, required, menuItems, placeholder}) => {
  return (
    <div className={clsx('FormikSelect', className)}>
      {label ? (
        <label className="FormikSelect__label" htmlFor={name}>
          {label}
          {required ? <RequiredAsterisk /> : null}
        </label>
      ) : null}
      <Field
        as={Select}
        className="FormikSelect__input"
        menuItems={menuItems}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      <span className="FormikSelect__error">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default FormikSelect;

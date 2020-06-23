import React, {FC} from 'react';
import clsx from 'clsx';
import {ErrorMessage} from 'formik';

import {Select, SelectProps} from '@renderer/components/FormElements';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {FormComponentBaseProps} from '@renderer/types/forms';

type ComponentProps = FormComponentBaseProps<SelectProps>;

const FormSelect: FC<ComponentProps> = ({className, isSearchable, label, name, required, options, placeholder}) => {
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelect FormFieldComponent', className)}>
      {label ? (
        <label htmlFor={name}>
          {label}
          {required ? <RequiredAsterisk /> : null}
        </label>
      ) : null}
      <Select
        className="FormField"
        error={error}
        isSearchable={isSearchable}
        options={options}
        onBlur={handleBlur}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        value={selectedOption}
      />
      <span className="error">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default FormSelect;

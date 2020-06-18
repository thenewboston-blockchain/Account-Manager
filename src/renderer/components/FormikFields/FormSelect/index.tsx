import React, {FC, useMemo} from 'react';
import clsx from 'clsx';
import {ErrorMessage, useFormikContext} from 'formik';

import {Select, SelectProps} from '@renderer/components/Inputs';
import RequiredAsterisk from '@renderer/components/RequiredAsterisk';
import {FormikInputBaseProps, SelectOption} from '@renderer/types/inputs';

type ComponentProps = FormikInputBaseProps<SelectProps>;

const FormSelect: FC<ComponentProps> = ({className, label, name, required, options, placeholder}) => {
  const {setFieldTouched, setFieldValue, values} = useFormikContext<{[name: string]: string}>();
  const selectedOption = useMemo(() => {
    const value = values[name];
    return options.find((option) => option.value === value) || null;
  }, [name, values]);

  const handleBlur = (): void => {
    setFieldTouched(name, true);
  };

  const handleChange = (option: SelectOption): void => {
    setFieldValue(name, option.value);
  };

  return (
    <div className={clsx('FormField FormSelect', className)}>
      {label ? (
        <label htmlFor={name}>
          {label}
          {required ? <RequiredAsterisk /> : null}
        </label>
      ) : null}
      <Select
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

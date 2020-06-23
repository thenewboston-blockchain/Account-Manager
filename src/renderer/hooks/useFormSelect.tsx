import React, {useMemo} from 'react';
import {useFormikContext} from 'formik';
import {SelectOption} from '@renderer/types/forms';

const useFormSelect = (name: string, options: SelectOption[]) => {
  const {errors, setFieldTouched, setFieldValue, touched, values} = useFormikContext<{[name: string]: string}>();
  const error = !!errors[name] && !!touched[name];

  const selectedOption = useMemo(() => {
    const value = values[name];
    return options.find((option) => option.value === value) || null;
  }, [name, options, values]);

  const handleBlur = (): void => {
    setFieldTouched(name, true);
  };

  const handleChange = (option: SelectOption): void => {
    setFieldValue(name, option.value);
  };

  return {
    error,
    handleBlur,
    handleChange,
    selectedOption,
  };
};

export default useFormSelect;

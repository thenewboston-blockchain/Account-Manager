import React from 'react';
import {useFormikContext} from 'formik';

const useFormContext = (name: string) => {
  const {errors, setFieldTouched, setFieldValue, touched, values} = useFormikContext<{[name: string]: string}>();
  const error = !!errors[name] && !!touched[name];

  return {
    error,
    setFieldTouched,
    setFieldValue,
    values,
  };
};

export default useFormContext;

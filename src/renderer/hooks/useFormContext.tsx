import {FormikErrors, FormikTouched, useFormikContext} from 'formik';

interface Values {
  [field: string]: any;
}

interface UseFormContextOutput {
  errors: FormikErrors<Values>;
  isValid: boolean;
  setFieldTouched(field: string, isTouched?: boolean, shouldValidate?: boolean): void;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  touched: FormikTouched<Values>;
  values: Values;
}

const useFormContext = (): UseFormContextOutput => {
  const {errors, isValid, setFieldTouched, setFieldValue, touched, values} = useFormikContext<Values>();

  return {
    errors,
    isValid,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  };
};

export default useFormContext;

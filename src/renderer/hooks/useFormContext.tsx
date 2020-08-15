import {FormikErrors, FormikTouched, useFormikContext} from 'formik';

interface Values {
  [field: string]: any;
}

interface UseFormContextOutput {
  errors: FormikErrors<Values>;
  setFieldTouched(field: string, isTouched?: boolean, shouldValidate?: boolean): void;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  touched: FormikTouched<Values>;
  values: Values;
}

const useFormContext = (): UseFormContextOutput => {
  const {errors, setFieldTouched, setFieldValue, touched, values} = useFormikContext<Values>();

  return {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  };
};

export default useFormContext;

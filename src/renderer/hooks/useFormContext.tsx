import {FormikErrors, FormikTouched, useFormikContext} from 'formik';

interface UseFormContextOutput {
  errors: FormikErrors<{[field: string]: any}>;
  setFieldTouched(field: string, isTouched?: boolean, shouldValidate?: boolean): void;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  touched: FormikTouched<{[field: string]: any}>;
  values: any;
}

const useFormContext = (): UseFormContextOutput => {
  const {errors, setFieldTouched, setFieldValue, touched, values} = useFormikContext<{[name: string]: string}>();

  return {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  };
};

export default useFormContext;

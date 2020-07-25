import {useFormikContext} from 'formik';

interface UseFormContextOutput {
  error: boolean;
  setFieldTouched(field: string, isTouched?: boolean, shouldValidate?: boolean): void;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  values: any;
}

const useFormContext = (name: string): UseFormContextOutput => {
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

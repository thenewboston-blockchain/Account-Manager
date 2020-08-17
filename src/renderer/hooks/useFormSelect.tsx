import {useMemo} from 'react';
import useFormContext from '@renderer/hooks/useFormContext';
import {InputOption} from '@renderer/types';

interface UseFormSelectOutput {
  error: boolean;
  handleBlur(): void;
  handleChange(option: InputOption): void;
  selectedOption: InputOption | null;
}

const useFormSelect = (name: string, options: InputOption[]): UseFormSelectOutput => {
  const {errors, setFieldTouched, setFieldValue, touched, values} = useFormContext();
  const error = !!errors[name] && !!touched[name];

  const selectedOption = useMemo(() => {
    const value = values[name];
    if (!value) return null;

    return options.find((option) => option.value === value) || {label: value, value};
  }, [name, options, values]);

  const handleBlur = (): void => {
    setFieldTouched(name, true);
  };

  const handleChange = (option: InputOption): void => {
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

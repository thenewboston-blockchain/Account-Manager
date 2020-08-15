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
  const {error, setFieldTouched, setFieldValue, values} = useFormContext(name);

  const selectedOption = useMemo(() => {
    const value = values[name];
    return options.find((option) => option.value === value) || null;
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

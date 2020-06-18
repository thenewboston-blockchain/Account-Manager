export type FormikInputBaseProps<T> = Omit<T, 'name' | 'onBlur' | 'onChange' | 'value'> & {
  label?: string;
  name: string;
  required?: boolean;
};

export interface SelectOption {
  label: string;
  value: string;
}

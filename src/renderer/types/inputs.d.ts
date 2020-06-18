export type FormComponentBaseProps<T> = Omit<T, 'name' | 'onBlur' | 'onChange' | 'value'> & {
  label?: string;
  name: string;
  required?: boolean;
};

export interface SelectOption {
  label: string;
  value: string;
}

export type BaseFormComponentProps<T> = Omit<T, 'name' | 'onBlur' | 'onChange' | 'value'> & {
  label?: string;
  name: string;
  required?: boolean;
};

export interface GenericFormValues {
  [fieldName: string]: boolean | string;
}

export interface SelectOption {
  disabled?: boolean;
  label?: string;
  value: string;
}

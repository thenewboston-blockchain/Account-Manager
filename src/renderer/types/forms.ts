export type BaseFormComponentProps<T> = Omit<T, 'name' | 'onBlur' | 'onChange' | 'value'> & {
  hideError?: boolean;
  label?: string;
  name: string;
  required?: boolean;
};

export type BaseFormInlineComponentProps<T> = Omit<T, 'name' | 'onBlur' | 'value'> & {
  label: string;
  name: string;
};

export interface GenericFormValues {
  [fieldName: string]: boolean | string;
}

export interface SelectOption {
  disabled?: boolean;
  label?: string;
  value: string;
}

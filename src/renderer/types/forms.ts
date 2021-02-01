export type BaseFormComponentProps<T> = Omit<T, 'name' | 'onBlur' | 'onChange' | 'value'> & {
  hideErrorBlock?: boolean;
  hideErrorText?: boolean;
  label?: string;
  name: string;
  required?: boolean;
};

export type BaseFormInlineComponentProps<T> = Omit<T, 'name' | 'onBlur' | 'value'> & {
  label: string;
  name: string;
};

export interface GenericFormValues {
  [fieldName: string]: any;
}

export interface InputOption {
  disabled?: boolean;
  label?: string;
  value: string;
}

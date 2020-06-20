export type FormComponentBaseProps<T> = Omit<T, 'name' | 'onBlur' | 'onChange' | 'value'> & {
  label?: string;
  name: string;
  required?: boolean;
};

export interface GenericFormValues {
  [fieldName: string]: boolean | string;
}

export type GenericFormOnSubmit = (values?: GenericFormValues) => void | Promise<void>;

export interface SelectOption {
  label: string;
  value: string;
}

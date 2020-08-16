/* eslint-disable react/jsx-props-no-spreading */

import React, {FC, useMemo} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {BaseRadioProps, Radio} from '@renderer/components/FormElements';
import {useFormContext} from '@renderer/hooks';
import {BaseFormComponentProps, InputOption} from '@renderer/types';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';
import {getCustomClassNames} from '@renderer/utils/components';

interface BaseRadioGroupProps extends Omit<BaseRadioProps, 'checked'> {
  options: InputOption[];
}

type ComponentProps = BaseFormComponentProps<BaseRadioGroupProps>;

const FormRadioGroup: FC<ComponentProps> = ({hideError = false, label, options, required, ...baseRadioProps}) => {
  const {className, name} = baseRadioProps;
  const {errors, setFieldTouched, setFieldValue, touched, values} = useFormContext();
  const error = !!errors[name] && !!touched[name];

  const selectedOption = useMemo(() => {
    const value = values[name];
    return options.find((option) => option.value === value) || null;
  }, [name, options, values]);

  const handleClick = (value: string) => async (): Promise<void> => {
    setFieldTouched(name, true, false);
    setFieldValue(name, value);
  };

  return (
    <div className={clsx('FormRadioGroup FormFieldComponent', className)}>
      {renderFormLabel(name, className, label, required)}
      {options.map((option) => {
        const selected = selectedOption?.value === option.value;
        return (
          <div className="FormField__option" key={option.value}>
            <Radio
              checked={selected}
              className={clsx('FormField__option-input', {...getCustomClassNames(className, '__option-input', true)})}
              disabled={option.disabled}
              error={error && selected}
              onClick={handleClick(option.value)}
              value={option.value}
            />
            <span
              className={clsx('FormField__option-label', {
                'FormField__option-label--disabled': option.disabled,
                ...getCustomClassNames(className, '__option-label', true),
                ...getCustomClassNames(className, '__option-label--disabled', option.disabled || false),
              })}
              onClick={option.disabled ? noop : handleClick(option.value)}
            >
              {option.label}
            </span>
          </div>
        );
      })}
      {renderFormError(name, className, hideError)}
    </div>
  );
};

export default FormRadioGroup;

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
  const {setFieldTouched, setFieldValue, values} = useFormContext(name);

  const selectedOption = useMemo(() => {
    const value = values[name];
    return options.find((option) => option.value === value) || null;
  }, [name, options, values]);

  const handleClick = (value: string) => (): void => {
    setFieldValue(name, value);
    setFieldTouched(name, true);
  };

  return (
    <div className={clsx('FormRadioGroup FormFieldComponent', className)}>
      {renderFormLabel(name, className, label, required)}
      {options.map((option) => {
        return (
          <div className="FormField__option" key={option.value}>
            <Radio
              checked={selectedOption?.value === option.value}
              className={clsx('FormField__option-input', {...getCustomClassNames(className, '__option-input', true)})}
              disabled={option.disabled}
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
      {hideError ? null : renderFormError(name, className)}
    </div>
  );
};

export default FormRadioGroup;

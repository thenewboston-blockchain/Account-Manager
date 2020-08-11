/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import clsx from 'clsx';

import {Select, BaseSelectProps} from '@renderer/components/FormElements';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {BaseFormComponentProps} from '@renderer/types';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = BaseFormComponentProps<BaseSelectProps>;

const FormSelect: FC<ComponentProps> = ({hideError = false, label, required, ...baseSelectProps}) => {
  const {className, name, options} = baseSelectProps;
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelect FormFieldComponent', className)}>
      {renderFormLabel(name, className, label, required)}
      <Select
        {...baseSelectProps}
        className="FormField"
        error={error}
        onBlur={handleBlur}
        onChange={handleChange}
        value={selectedOption}
      />
      {hideError ? null : renderFormError(name, className)}
    </div>
  );
};

export default FormSelect;

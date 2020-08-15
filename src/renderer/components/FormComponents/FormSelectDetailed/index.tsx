/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import clsx from 'clsx';

import {BaseSelectProps, SelectDetailed} from '@renderer/components/FormElements';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {BaseFormComponentProps} from '@renderer/types';
import {renderFormEmptyError, renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = BaseFormComponentProps<BaseSelectProps>;

const FormSelectDetailed: FC<ComponentProps> = ({hideError = false, label, required, ...baseSelectProps}) => {
  const {className, name, options} = baseSelectProps;
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelectDetailed FormFieldComponent', className)}>
      {renderFormLabel(name, className, label, required)}
      <SelectDetailed
        {...baseSelectProps}
        className="FormField"
        error={error}
        onBlur={handleBlur}
        onChange={handleChange}
        value={selectedOption}
      />
      {hideError ? renderFormEmptyError() : renderFormError(name, className)}
    </div>
  );
};

export default FormSelectDetailed;

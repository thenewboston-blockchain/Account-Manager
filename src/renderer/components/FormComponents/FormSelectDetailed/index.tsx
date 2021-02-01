/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import clsx from 'clsx';

import {BaseSelectProps, SelectDetailed} from '@renderer/components/FormElements';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {BaseFormComponentProps} from '@renderer/types';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms/formComponents';

type ComponentProps = BaseFormComponentProps<BaseSelectProps>;

const FormSelectDetailed: FC<ComponentProps> = ({hideErrorText = false, label, required, ...baseSelectProps}) => {
  const {className, name, options} = baseSelectProps;
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options, baseSelectProps);

  return (
    <div className={clsx('FormSelectDetailed', 'FormFieldComponent', className)}>
      {renderFormLabel({className, label, name, required})}
      <SelectDetailed
        {...baseSelectProps}
        className="FormField"
        error={error}
        onBlur={handleBlur}
        onChange={handleChange}
        value={selectedOption}
      />
      {renderFormError({className, hideErrorText, name})}
    </div>
  );
};

export default FormSelectDetailed;

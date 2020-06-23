import React, {FC} from 'react';
import clsx from 'clsx';

import {Select} from '@renderer/components/FormElements';
import {BaseSelectProps} from '@renderer/components/FormElements/Select';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

interface ComponentProps extends BaseSelectProps {
  label?: string;
  name: string;
  required?: boolean;
}

const FormSelect: FC<ComponentProps> = ({className, isSearchable, label, name, required, options, placeholder}) => {
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelect FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <Select
        className="FormField"
        error={error}
        isSearchable={isSearchable}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        value={selectedOption}
      />
      {renderFormError(name)}
    </div>
  );
};

export default FormSelect;

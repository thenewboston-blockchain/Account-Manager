import React, {FC} from 'react';
import clsx from 'clsx';

import {SelectDetailed} from '@renderer/components/FormElements';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {SelectOption} from '@renderer/types/forms';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

interface ComponentProps {
  className?: string;
  error?: boolean;
  isSearchable?: boolean;
  label?: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

const FormSelectDetailed: FC<ComponentProps> = ({
  className,
  isSearchable,
  label,
  name,
  options,
  placeholder,
  required,
}) => {
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelectDetailed FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <SelectDetailed
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

export default FormSelectDetailed;

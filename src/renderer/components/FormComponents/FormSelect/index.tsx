import React, {FC} from 'react';
import clsx from 'clsx';

import {Select, SelectProps} from '@renderer/components/FormElements';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {FormComponentBaseProps} from '@renderer/types/forms';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = FormComponentBaseProps<SelectProps>;

const FormSelect: FC<ComponentProps> = ({className, isSearchable, label, name, required, options, placeholder}) => {
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelect FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <Select
        className="FormField"
        error={error}
        isSearchable={isSearchable}
        options={options}
        onBlur={handleBlur}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        value={selectedOption}
      />
      {renderFormError(name)}
    </div>
  );
};

export default FormSelect;

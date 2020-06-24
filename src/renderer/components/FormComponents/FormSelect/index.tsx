import React, {FC} from 'react';
import clsx from 'clsx';

import {Select, BaseSelectProps} from '@renderer/components/FormElements';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {BaseFormComponentProps} from '@renderer/types/forms';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = BaseFormComponentProps<BaseSelectProps>;

const FormSelect: FC<ComponentProps> = ({className, label, name, required, options, ...baseSelectProps}) => {
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelect FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <Select
        className="FormField"
        error={error}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        options={options}
        value={selectedOption}
        {...baseSelectProps}
      />
      {renderFormError(name)}
    </div>
  );
};

export default FormSelect;

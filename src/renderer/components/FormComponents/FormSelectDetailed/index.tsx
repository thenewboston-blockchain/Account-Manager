import React, {FC} from 'react';
import clsx from 'clsx';

import {SelectDetailed, BaseSelectProps} from '@renderer/components/FormElements';
import useFormSelect from '@renderer/hooks/useFormSelect';
import {BaseFormComponentProps} from '@renderer/types/forms';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms';

type ComponentProps = BaseFormComponentProps<BaseSelectProps>;

const FormSelectDetailed: FC<ComponentProps> = ({className, label, name, options, required, ...baseSelectProps}) => {
  const {error, handleBlur, handleChange, selectedOption} = useFormSelect(name, options);

  return (
    <div className={clsx('FormSelectDetailed FormFieldComponent', className)}>
      {renderFormLabel(name, label, required)}
      <SelectDetailed
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

export default FormSelectDetailed;

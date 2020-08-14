/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import {Field} from 'formik';
import clsx from 'clsx';

import {BaseRadioProps, Radio} from '@renderer/components/FormElements';
import {useFormContext} from '@renderer/hooks';
import {BaseFormInlineComponentProps} from '@renderer/types';
import {renderFormLabelInline} from '@renderer/utils/forms';

type ComponentProps = BaseFormInlineComponentProps<BaseRadioProps>;

const FormRadio: FC<ComponentProps> = ({label, ...baseInputProps}) => {
  const {className, name} = baseInputProps;
  const {error} = useFormContext(name);

  return (
    <div className={clsx('FormRadio FormFieldInlineComponent', className)}>
      <Field {...baseInputProps} as={Radio} className="FormFieldInline" error={error} />
      {renderFormLabelInline(name, className, label)}
    </div>
  );
};

export default FormRadio;

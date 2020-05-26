import React from 'react';
import {ErrorMessage, Field} from 'formik';

import Select from '@renderer/components/Inputs/Select';
import {SelectProps} from '@material-ui/core/Select';

import {SelectMenuItem} from '@renderer/types/inputs';

interface FormikSelectProps extends SelectProps {
  initialLabelWidth?: number;
  name: string;
  options: SelectMenuItem[];
}

const FormikSelect = function ({name, ...props}: FormikSelectProps) {
  return <Field as={Select} errorMessage={<ErrorMessage name={name} />} fullWidth name={name} {...props} />;
};

export default FormikSelect;

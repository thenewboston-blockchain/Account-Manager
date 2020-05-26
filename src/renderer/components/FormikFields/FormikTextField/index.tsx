import React from 'react';
import {ErrorMessage, Field} from 'formik';

import TextField from '@renderer/components/Inputs/TextField';
import {BaseTextFieldProps} from '@material-ui/core/TextField';

interface FormikTextFieldProps extends BaseTextFieldProps {
  name: string;
}

const FormikTextField = function ({name, ...props}: FormikTextFieldProps) {
  return <Field as={TextField} fullWidth helperText={<ErrorMessage name={name} />} name={name} {...props} />;
};

export default FormikTextField;

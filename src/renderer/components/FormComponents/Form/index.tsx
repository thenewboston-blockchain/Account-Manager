import React, {FC} from 'react';
import {Form as FormikForm, Formik} from 'formik';
import {GenericFormOnSubmit, GenericFormValues} from '@renderer/types/forms';

interface ComponentProps {
  className?: string;
  initialValues?: GenericFormValues;
  onSubmit: GenericFormOnSubmit;
  validationSchema?: any;
}

const Form: FC<ComponentProps> = ({children, className, onSubmit, initialValues = {}, validationSchema}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {() => <FormikForm className={className}>{children}</FormikForm>}
    </Formik>
  );
};

export default Form;

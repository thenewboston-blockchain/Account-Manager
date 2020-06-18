import React, {FC} from 'react';
import {Form as FormikForm, Formik} from 'formik';

interface GenericValues {
  [fieldName: string]: boolean | string;
}

interface ComponentProps {
  className?: string;
  initialValues: GenericValues;
  onSubmit(values: GenericValues): void | Promise<any>;
  validationSchema?: any;
}

const Form: FC<ComponentProps> = ({children, className, onSubmit, initialValues, validationSchema}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {() => <FormikForm className={className}>{children}</FormikForm>}
    </Formik>
  );
};

export default Form;

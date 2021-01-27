import React, {FC} from 'react';
import {Form as FormikForm, Formik} from 'formik';
import {GenericFormValues} from '@renderer/types';

interface ComponentProps {
  className?: string;
  initialValues?: GenericFormValues;
  onSubmit(values: GenericFormValues): void | Promise<any>;
  validateOnMount?: boolean;
  validationSchema?: any;
}

const Form: FC<ComponentProps> = ({
  children,
  className,
  onSubmit,
  initialValues = {},
  validateOnMount = false,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={validateOnMount}
      validationSchema={validationSchema}
    >
      {() => (
        <FormikForm className={className} spellCheck="false">
          {children}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;

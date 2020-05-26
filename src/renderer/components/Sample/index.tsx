import React from 'react';
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';

import "./Sample.scss";

const initialValues = {
  protocol: 'http',
  ipAddress: '',
  port: '80'
};

const SampleSchema = Yup.object().shape({
  protocol: Yup.string().required(),
  ipAddress: Yup.string().required(),
  port: Yup.number().integer()
})

const Sample = function() {
  const handleSubmit = ({protocol, ipAddress, port}: typeof initialValues) => {
    console.log(`${protocol}://${ipAddress}${port}`);
  }

  return (
    <div className="Sample">
      <h2>Sample Heading Here</h2>
      <p>Enter the address of any node on the network to connect.</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SampleSchema}>
        {() => (
          <Form className="Sample__form">
            <div className="form-row">
              <label htmlFor="protocol">Protocol:</label>
              <Field as="select" name="protocol">
                <option value="http">http</option>
                <option value="https">https</option>
              </Field>
            </div>
            <div className="form-row">
              <label htmlFor="ipAddress">IP Address:</label>
              <Field name="ipAddress" />
            </div>
            <div className="form-row">
              <label htmlFor="port">Port:</label>
              <Field name="port" />
            </div>
            <div className="form-submit">
              <button type="submit">Connect</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Sample;

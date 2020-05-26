import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import Button from '@renderer/components/Inputs/Button';
import FormikTextField from '@renderer/components/FormikFields/FormikTextField';
import FormikSelect from '@renderer/components/FormikFields/FormikSelect';
import {SelectMenuItem} from '@renderer/types/inputs';

import './Sample.scss';

const initialValues = {
  protocol: 'http',
  ipAddress: '',
  port: '80',
};

const protocolOptions: SelectMenuItem[] = [
  {label: 'http', value: 'http'},
  {label: 'https', value: 'https'},
];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const SampleSchema = Yup.object().shape({
  protocol: Yup.string().required(),
  ipAddress: Yup.string()
    .required('This field is required')
    .matches(genericIpAddressRegex, {message: 'IPv4 or IPv6 addresses only', excludeEmptyString: true}),
  port: Yup.number().integer(),
});

const Sample = function () {
  const handleSubmit = ({protocol, ipAddress, port}: typeof initialValues) => {
    console.log(`${protocol}://${ipAddress}${port}`);
  };

  return (
    <div className="Sample">
      <div className="Sample__header">
        <img className="header__logo" src={require('@renderer/assets/logo.jpg')} alt="logo" />
        The<span>New</span>Boston
      </div>
      <div className="Sample__body">
        <p>Enter the address of any node on the network to connect.</p>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SampleSchema}>
          {({dirty, errors, isValid}) => (
            <Form className="Sample__form">
              <div className="form-row">
                <FormikSelect
                  error={!!errors.protocol}
                  initialLabelWidth={64}
                  label="Protocol"
                  name="protocol"
                  options={protocolOptions}
                  required
                />
              </div>
              <div className="form-row">
                <FormikTextField name="ipAddress" label="IP Address" error={!!errors.ipAddress} required />
              </div>
              <div className="form-row">
                <FormikTextField name="port" label="Port" error={!!errors.port} type="number" />
              </div>
              <div className="form-submit">
                <Button disabled={!dirty || !isValid} type="submit">
                  Connect
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Sample;

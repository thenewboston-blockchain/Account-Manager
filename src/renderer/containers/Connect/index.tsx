import React, {FC} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import Button from '@renderer/components/Button';
import {FormikSelect, FormikTextField} from '@renderer/components/FormikFields';

import './Connect.scss';
import {SelectMenuItem} from '@renderer/types/inputs';

const initialValues = {
  protocol: 'http',
  ipAddress: '',
  port: '80',
};

type FormValues = typeof initialValues;

const protocolOptions: SelectMenuItem[] = [
  {label: 'http', value: 'http'},
  {label: 'https', value: 'https'},
];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const ValidationSchema = Yup.object().shape({
  protocol: Yup.string().required(),
  ipAddress: Yup.string()
    .required('This field is required')
    .matches(genericIpAddressRegex, {message: 'IPv4 or IPv6 addresses only', excludeEmptyString: true}),
  port: Yup.number().integer(),
});

const Connect: FC = () => {
  const history = useHistory();

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    history.push('/bank');
  };

  return (
    <div className="Connect">
      <div className="Connect__header">
        <img className="header__logo" src={require('@renderer/assets/logo.png')} alt="logo" />
        <h2>thenewboston</h2>
      </div>
      <div className="Connect__subheader">Enter the address of any node on the network to connect.</div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ValidationSchema}>
        {({dirty, errors, isValid}) => {
          return (
            <Form className="Connect__form">
              <FormikSelect
                className="Connect__field"
                label="Protocol"
                menuItems={protocolOptions}
                name="protocol"
                required
              />
              <FormikTextField className="Connect__field" label="IP Address" name="ipAddress" required />
              <FormikTextField className="Connect__field" label="Port" name="port" type="number" />
              <Button type="submit">Connect</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Connect;

import React, {FC} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import Button from '@renderer/components/Button';
import {FormSelect, FormInputField} from '@renderer/components/FormComponents';
import TnbLogo from '@renderer/components/TnbLogo';
import {SelectOption} from '@renderer/types/inputs';

import './Connect.scss';

const initialValues = {
  protocol: 'http',
  ipAddress: '',
  port: '80',
};

type FormValues = typeof initialValues;

const protocolOptions: SelectOption[] = [
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
        <TnbLogo size={30} />
        <h2>thenewboston</h2>
      </div>
      <div className="Connect__subheader">Enter the address of any node on the network to connect.</div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ValidationSchema}>
        {({dirty, isValid}) => {
          const submitIsDisabled = !dirty || !isValid;
          return (
            <Form className="Connect__form">
              <FormSelect
                className="Connect__field"
                label="Protocol"
                options={protocolOptions}
                name="protocol"
                required
              />
              <FormInputField className="Connect__field" label="IP Address" name="ipAddress" required />
              <FormInputField className="Connect__field" label="Port" name="port" type="number" />
              <Button className="Connect__submit" disabled={submitIsDisabled} type="submit">
                Connect
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Connect;

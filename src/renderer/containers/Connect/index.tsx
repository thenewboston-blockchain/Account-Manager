import axios from 'axios';
import React, {FC} from 'react';
import {Route, useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {Form, FormButton, FormInput, FormSelect} from '@renderer/components/FormComponents';
import Logo from '@renderer/components/Logo';
import {SelectOption} from '@renderer/types/forms';
import {formatAddress} from '@renderer/utils/format';

import './Connect.scss';

const initialValues = {
  protocol: 'http',
  ipAddress: '',
  port: '80',
};

type FormValues = typeof initialValues;

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const validationSchema = Yup.object().shape({
  protocol: Yup.string().required(),
  ipAddress: Yup.string()
    .required('This field is required')
    .matches(genericIpAddressRegex, {message: 'IPv4 or IPv6 addresses only', excludeEmptyString: true}),
  port: Yup.number().integer(),
});

const Connect: FC = () => {
  const history = useHistory();

  const goToMain = () => {
    history.push('/bank');
  };

  const handleSubmit = async (values: FormValues) => {
    const {ipAddress, port, protocol} = values;
    const address = formatAddress(ipAddress, port, protocol);
    const response = await axios.get(`${address}/config`);
    console.warn(response);
    // history.push('/bank');
  };

  return (
    <div className="Connect">
      <div className="draggable-area draggable" />
      <div className="Connect__header">
        <Logo size={30} />
        <h2>thenewboston</h2>
      </div>
      <div className="Connect__subheader">Enter the address of a bank.</div>
      <Form
        className="Connect__form"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormSelect
          className="Connect__field"
          isSearchable={false}
          label="Protocol"
          name="protocol"
          options={protocolOptions}
          required
        />
        <FormInput className="Connect__field" label="IP Address" name="ipAddress" required />
        <FormInput className="Connect__field" label="Port" name="port" type="number" />

        <FormButton type="submit">Connect</FormButton>
        <FormButton className="Connect__go" onClick={goToMain}>
          Go (dev only)
        </FormButton>
      </Form>
    </div>
  );
};

export default Connect;

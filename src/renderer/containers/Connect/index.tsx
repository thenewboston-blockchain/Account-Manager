import React, {FC} from 'react';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {Form, FormButton, FormDetailedSelect, FormInput, FormSelect} from '@renderer/components/FormComponents';
import Logo from '@renderer/components/Logo';
import {SelectOption} from '@renderer/types/forms';

import './Connect.scss';

const initialValues = {
  account: '', // TODO: Delete after PR Review
  protocol: 'http',
  ipAddress: '',
  port: '80',
};

type FormValues = typeof initialValues;

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

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

  const goToMain = () => {
    history.push('/bank');
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    history.push('/bank');
  };

  return (
    <div className="Connect">
      <div className="Connect__header">
        <Logo size={30} />
        <h2>thenewboston</h2>
      </div>
      <div className="Connect__subheader">Enter the address of any node on the network to connect.</div>
      <Form
        className="Connect__form"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ValidationSchema}
      >
        <FormSelect
          className="Connect__field"
          isSearchable={false}
          label="Protocol"
          options={protocolOptions}
          name="protocol"
          required
        />
        <FormInput className="Connect__field" label="IP Address" name="ipAddress" required />
        <FormInput className="Connect__field" label="Port" name="port" type="number" />
        {/* TODO: Delete after PR */}
        <FormDetailedSelect
          options={[
            {label: 'Donations', value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb'},
            {label: 'Personal', value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdc'},
            {label: 'Validator Income', value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdd'},
            {value: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acde'},
          ]}
          name="account"
          label="From: Account"
        />
        <FormButton type="submit">Connect</FormButton>
        <FormButton className="Connect__go" onClick={goToMain}>
          Go
        </FormButton>
      </Form>
    </div>
  );
};

export default Connect;

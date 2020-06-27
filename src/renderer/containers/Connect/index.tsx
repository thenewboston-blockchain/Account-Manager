import React, {FC} from 'react';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {Form, FormButton, FormInput, FormSelect, FormSelectDetailed} from '@renderer/components/FormComponents';
import Logo from '@renderer/components/Logo';
import {SelectOption} from '@renderer/types/forms';

import './Connect.scss';

const initialValues = {
  account1: '10cdd4ba04456ca169baca3d66eace869520c62fe84421329086e0391a68acdb',
  account2: '',
  protocol: 'http',
  ipAddress: '',
  port: '80',
};

type FormValues = typeof initialValues;

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

// TODO: Delete before merge
const accountOptions: SelectOption[] = [
  {label: 'Amy', value: '10cdd4ba04456ca169baca3d66eace869520c62fe84421329086e0391a68acdb'},
  {disabled: true, label: 'Dave', value: '10cdd4ba04456ca169baca3d66eace869520c62fe84421329086e0391a68acdc'},
  {label: 'Validator Income', value: '10cdd4ba04456ca169baca3d66eace869520c62fe84421329086e0391a68acdd'},
  {value: '10cdd4ba04456ca169baca3d66eace869520c62fe84421329086e0391a68acde'},
  {disabled: true, value: '10cdd4ba04456ca169baca3d66eace869520c62fe84421329086e0391a68acdf'},
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

  const goToMain = () => {
    history.push('/bank');
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values.account1.length);
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

        {/* TODO: Delete before merge */}
        <FormSelectDetailed
          className="Connect__field"
          label="Account #"
          options={accountOptions}
          placeholder="placeholder"
          name="account1"
        />
        <FormSelectDetailed
          className="Connect__field"
          disabled
          label="Account #"
          options={accountOptions}
          placeholder="placeholder"
          name="account2"
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

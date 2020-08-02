import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {fetchActiveBank} from '@renderer/api/banks';
import {Form, FormButton, FormInput, FormSelect} from '@renderer/components/FormComponents';
import Logo from '@renderer/components/Logo';
import {SelectOption} from '@renderer/types/forms';
import {formatAddress} from '@renderer/utils/format';

import './Connect.scss';

const initialValues = {
  ipAddress: '167.99.173.247',
  port: '',
  protocol: 'http',
};

type FormValues = typeof initialValues;

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const validationSchema = Yup.object().shape({
  ipAddress: Yup.string()
    .required('This field is required')
    .matches(genericIpAddressRegex, {excludeEmptyString: true, message: 'IPv4 or IPv6 addresses only'}),
  port: Yup.number().integer(),
  protocol: Yup.string().required(),
});

const Connect: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToMain = (): void => {
    history.push('/bank/123456/overview');
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const {ipAddress, port, protocol} = values;
    const address = formatAddress(ipAddress, port, protocol);
    await dispatch(fetchActiveBank(address));
  };

  return (
    <div className="Connect">
      <div className="Connect__header">
        <Logo className="Connect__logo" size={30} />
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

        <FormButton ignoreDirty type="submit">
          Connect
        </FormButton>
        <FormButton className="Connect__go" onClick={goToMain}>
          Go (dev only)
        </FormButton>
      </Form>
    </div>
  );
};

export default Connect;

import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

import {Form, FormButton, FormInput, FormSelect} from '@renderer/components/FormComponents';
import Logo from '@renderer/components/Logo';
import {connectAndStoreLocalData} from '@renderer/dispatchers/app';
import {getActiveBankConfig} from '@renderer/selectors';
import {AppDispatch, InputOption, ProtocolType} from '@renderer/types';
import yup from '@renderer/utils/yup';

import './Connect.scss';

const initialValues = {
  ipAddress: '167.99.173.247',
  nickname: 'My Cool Bank',
  port: '',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

const protocolOptions: InputOption[] = [{value: 'http'}, {value: 'https'}];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const validationSchema = yup.object().shape({
  ipAddress: yup
    .string()
    .required('This field is required')
    .matches(genericIpAddressRegex, {excludeEmptyString: true, message: 'IPv4 or IPv6 addresses only'}),
  nickname: yup.string(),
  port: yup.number().integer(),
  protocol: yup.string().required(),
});

const Connect: FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const activeBankConfig = useSelector(getActiveBankConfig);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  useEffect(() => {
    if (activeBankConfig) history.push(`/bank/${activeBankConfig.node_identifier}/overview`);
  }, [activeBankConfig, history]);

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const bankNetworkData = {
        ip_address: ipAddress,
        port: parseInt(port, 10),
        protocol,
      };
      const response = await dispatch(connectAndStoreLocalData(bankNetworkData, nickname));
      if (response?.error) {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
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
          label="Protocol"
          name="protocol"
          options={protocolOptions}
          required
          searchable={false}
        />
        <FormInput className="Connect__field" label="IP Address" name="ipAddress" required />
        <FormInput className="Connect__field" label="Port" name="port" type="number" />
        <FormInput className="Connect__field" label="Nickname" name="nickname" />

        <FormButton ignoreDirty submitting={submitting} type="submit">
          Connect
        </FormButton>
      </Form>
    </div>
  );
};

export default Connect;

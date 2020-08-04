import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';

import {fetchBankConfig} from '@renderer/api/configs/bankConfigs';
import {fetchValidatorConfig} from '@renderer/api/configs/validatorConfigs';
import {setActiveBankState} from '@renderer/store/app/activeBank';
import {setActivePrimaryValidatorState} from '@renderer/store/app/activePrimaryValidator';
import {Form, FormButton, FormInput, FormSelect} from '@renderer/components/FormComponents';
import Logo from '@renderer/components/Logo';
import {getActiveBankConfig} from '@renderer/selectors';
import {ProtocolType} from '@renderer/types/api';
import {SelectOption} from '@renderer/types/forms';
import {AppDispatch} from '@renderer/types/store';

import './Connect.scss';

const initialValues = {
  ipAddress: '167.99.173.247',
  nickname: 'My Cool Bank',
  port: '',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

const genericIpAddressRegex = /([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3}/;

const validationSchema = Yup.object().shape({
  ipAddress: Yup.string()
    .required('This field is required')
    .matches(genericIpAddressRegex, {excludeEmptyString: true, message: 'IPv4 or IPv6 addresses only'}),
  nickname: Yup.string(),
  port: Yup.number().integer(),
  protocol: Yup.string().required(),
});

const Connect: FC = () => {
  const activeBankConfig = useSelector(getActiveBankConfig);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  useEffect(() => {
    if (activeBankConfig) history.push(`/bank/${activeBankConfig.node_identifier}/overview`);
  }, [activeBankConfig, history]);

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      const bankNetworkData = {
        ip_address: ipAddress,
        port: parseInt(port, 10),
        protocol,
      };
      const bankConfigData = await dispatch(fetchBankConfig(bankNetworkData));
      const {node_identifier: nodeIdentifier, primary_validator: primaryValidator} = bankConfigData;

      const primaryValidatorData = {
        ip_address: primaryValidator.ip_address,
        port: primaryValidator.port,
        protocol: primaryValidator.protocol,
      };
      const validatorConfigData = await dispatch(fetchValidatorConfig(primaryValidatorData));

      const activeBankData = {
        ...bankNetworkData,
        nickname,
        node_identifier: nodeIdentifier,
      };
      dispatch(setActiveBankState(activeBankData));

      const activePrimaryValidatorData = {
        ...primaryValidatorData,
        nickname: '',
        node_identifier: validatorConfigData.node_identifier,
      };
      dispatch(setActivePrimaryValidatorState(activePrimaryValidatorData));
    } catch (error) {
      console.log('error', error);
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
          isSearchable={false}
          label="Protocol"
          name="protocol"
          options={protocolOptions}
          required
        />
        <FormInput className="Connect__field" label="IP Address" name="ipAddress" required />
        <FormInput className="Connect__field" label="Port" name="port" type="number" />
        <FormInput className="Connect__field" label="Nickname" name="nickname" />

        <FormButton ignoreDirty type="submit">
          Connect
        </FormButton>
      </Form>
    </div>
  );
};

export default Connect;

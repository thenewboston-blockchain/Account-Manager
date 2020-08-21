import {setActiveBank, setActivePrimaryValidator} from '@renderer/store/app';
import {AddressData, AppDispatch} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

import {fetchBankConfig} from '../banks';
import {fetchValidatorConfig} from '../validators';

export const connect = (network: AddressData) => async (dispatch: AppDispatch) => {
  const address = formatAddressFromNode(network);
  const bankConfig = await dispatch(fetchBankConfig(address));
  if (bankConfig.error) {
    return {
      address: bankConfig.address,
      error: bankConfig.error,
    };
  }

  if (!bankConfig.data) {
    throw new Error('No BankConfig data');
  }
  const {primary_validator: primaryValidator} = bankConfig.data;

  const primaryValidatorAddress = formatAddressFromNode(primaryValidator);
  const validatorConfig = await dispatch(fetchValidatorConfig(primaryValidatorAddress));
  if (validatorConfig.error) {
    return {
      address: validatorConfig.error,
      error: validatorConfig.error,
    };
  }

  if (!validatorConfig.data) {
    throw new Error('No ValidatorConfig data');
  }

  return {
    address,
    bankConfig: bankConfig.data,
    validatorConfig: validatorConfig.data,
  };
};

export const connectAndStoreLocalData = (network: AddressData, bankNickname: string) => async (
  dispatch: AppDispatch,
) => {
  const connectResponse = await dispatch(connect(network));
  if (connectResponse?.error) {
    return connectResponse;
  }
  const {bankConfig, validatorConfig} = connectResponse;
  if (!bankConfig) {
    return {
      address: connectResponse.address,
      error: 'No BankConfig Data',
    };
  }
  if (!validatorConfig) {
    return {
      address: connectResponse.address,
      error: 'No ValidatorConfig Data',
    };
  }

  const activeBankData = {
    ip_address: bankConfig.ip_address,
    nickname: bankNickname,
    node_identifier: bankConfig.node_identifier,
    port: bankConfig.port,
    protocol: bankConfig.protocol,
  };
  dispatch(setActiveBank(activeBankData));

  const activePrimaryValidatorData = {
    ip_address: validatorConfig.ip_address,
    nickname: '',
    node_identifier: validatorConfig.node_identifier,
    port: validatorConfig.port,
    protocol: validatorConfig.protocol,
  };
  dispatch(setActivePrimaryValidator(activePrimaryValidatorData));

  return connectResponse;
};

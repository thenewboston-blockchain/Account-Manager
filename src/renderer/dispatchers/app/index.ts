import {setActiveBank, setActivePrimaryValidator} from '@renderer/store/app';
import {AddressData} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';
import {formatAddressFromNode} from '@renderer/utils/address';

import {fetchBankConfig} from '../banks';
import {fetchValidatorConfig} from '../validators';

export const connect = (network: AddressData) => async (dispatch: AppDispatch) => {
  const address = formatAddressFromNode(network);
  const bankConfig = await dispatch(fetchBankConfig(address));
  if (!bankConfig) return;

  const {primary_validator: primaryValidator} = bankConfig;

  const primaryValidatorAddress = formatAddressFromNode(primaryValidator);
  const validatorConfig = await dispatch(fetchValidatorConfig(primaryValidatorAddress));
  if (!validatorConfig) return;

  return {
    bankConfig,
    validatorConfig,
  };
};

export const connectAndStoreLocalData = (network: AddressData, bankNickname: string) => async (
  dispatch: AppDispatch,
) => {
  const connectResponse = await dispatch(connect(network));
  if (!connectResponse) return;
  const {bankConfig, validatorConfig} = connectResponse;

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
};

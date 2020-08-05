import {setActiveBank, setActivePrimaryValidator} from '@renderer/store/app';
import {Network} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';

import {fetchBankConfig, fetchValidatorConfig} from '../configs';

export const connect = (network: Network) => async (dispatch: AppDispatch) => {
  const bankConfig = await dispatch(fetchBankConfig(network));
  const {primary_validator: primaryValidator} = bankConfig;

  const primaryValidatorNetwork = {
    ip_address: primaryValidator.ip_address,
    port: primaryValidator.port,
    protocol: primaryValidator.protocol,
  };
  const validatorConfig = await dispatch(fetchValidatorConfig(primaryValidatorNetwork));

  return {
    bankConfig,
    validatorConfig,
  };
};

export const connectAndStoreLocalData = (network: Network, bankNickname: string) => async (dispatch: AppDispatch) => {
  const {bankConfig, validatorConfig} = await dispatch(connect(network));

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

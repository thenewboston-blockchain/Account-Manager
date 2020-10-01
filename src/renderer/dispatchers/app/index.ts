import {getIsActivePrimaryValidator} from '@renderer/selectors';
import store from '@renderer/store';
import {
  changeActiveBank,
  changeActivePrimaryValidator,
  clearManagedAccounts,
  clearManagedBanks,
  clearManagedFriends,
  clearManagedValidators,
  setManagedBank,
  setManagedValidator,
} from '@renderer/store/app';
import {AddressData, AppDispatch, RootState} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

import {fetchBankConfig} from '../banks';
import {fetchValidatorConfig} from '../validators';

export const clearLocalState = () => (dispatch: AppDispatch) => {
  dispatch(clearManagedAccounts());
  dispatch(clearManagedBanks());
  dispatch(clearManagedFriends());
  dispatch(clearManagedValidators());
};

export const connect = (bankAddressData: AddressData) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();

  const address = formatAddressFromNode(bankAddressData);
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

  const validatorConfigResponse = await dispatch(fetchValidatorConfig(primaryValidatorAddress));
  if (validatorConfigResponse.error) {
    return {
      address: validatorConfigResponse.error,
      error: validatorConfigResponse.error,
    };
  }

  if (!validatorConfigResponse.data) {
    throw new Error('No ValidatorConfig data');
  }

  if (!getIsActivePrimaryValidator(state, primaryValidatorAddress)) {
    const activePrimaryValidatorData = {
      ip_address: validatorConfigResponse.data.ip_address,
      nickname: '',
      nid_signing_key: '',
      node_identifier: validatorConfigResponse.data.node_identifier,
      port: validatorConfigResponse.data.port,
      protocol: validatorConfigResponse.data.protocol,
    };

    dispatch(setManagedValidator(activePrimaryValidatorData));
    dispatch(changeActivePrimaryValidator(activePrimaryValidatorData));
  }

  return {
    address,
    bankConfig: bankConfig.data,
    validatorConfig: validatorConfigResponse.data,
  };
};

export const connectAndStoreLocalData = (bankAddressData: AddressData, bankNickname: string) => async (
  dispatch: AppDispatch,
) => {
  const connectResponse = await dispatch(connect(bankAddressData));
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
    nid_signing_key: '',
    node_identifier: bankConfig.node_identifier,
    port: bankConfig.port,
    protocol: bankConfig.protocol,
  };

  dispatch(setManagedBank(activeBankData));
  dispatch(changeActiveBank(activeBankData));

  const activePrimaryValidatorData = {
    ip_address: validatorConfig.ip_address,
    nickname: '',
    nid_signing_key: '',
    node_identifier: validatorConfig.node_identifier,
    port: validatorConfig.port,
    protocol: validatorConfig.protocol,
  };
  dispatch(setManagedValidator(activePrimaryValidatorData));
  dispatch(changeActivePrimaryValidator(activePrimaryValidatorData));

  return connectResponse;
};

export const fetchNonDefaultNodeConfigs = () => async (dispatch: AppDispatch) => {
  const {
    app: {managedBanks, managedValidators},
  } = store.getState();

  const bankPromises = Object.values(managedBanks)
    .filter((bank) => !bank.is_default)
    .map((bank) => {
      const address = formatAddressFromNode(bank);
      return dispatch(fetchBankConfig(address));
    });

  const validatorPromises = Object.values(managedValidators)
    .filter((validator) => !validator.is_default)
    .map((validator) => {
      const address = formatAddressFromNode(validator);
      return dispatch(fetchValidatorConfig(address));
    });

  await Promise.all(bankPromises);
  await Promise.all(validatorPromises);
};

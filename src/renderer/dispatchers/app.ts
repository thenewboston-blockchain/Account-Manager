import {
  getIsActiveBank,
  getIsActivePrimaryValidator,
  getIsManagedBank,
  getIsManagedValidator,
  getManagedBanks,
  getManagedValidators,
} from '@renderer/selectors';
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
import {AddressData, AppDispatch, RootState, ValidatorConfig} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

import {fetchBankConfig} from './banks';
import {fetchValidatorConfig} from './validators';

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
      address: primaryValidatorAddress,
      error: validatorConfigResponse.error,
    };
  }

  if (!validatorConfigResponse.data) {
    throw new Error('No ValidatorConfig data');
  }

  if (getIsManagedValidator(state, primaryValidatorAddress)) {
    const managedValidators = getManagedValidators(state);
    const managedValidator = managedValidators[primaryValidatorAddress];
    const activePrimaryValidatorData = {
      ...managedValidator,
      ip_address: validatorConfigResponse.data.ip_address,
      port: validatorConfigResponse.data.port,
      protocol: validatorConfigResponse.data.protocol,
    };

    dispatch(setManagedValidator(activePrimaryValidatorData));

    if (!getIsActivePrimaryValidator(state, primaryValidatorAddress)) {
      dispatch(changeActivePrimaryValidator(activePrimaryValidatorData));
    }
  } else {
    const activePrimaryValidatorData = {
      account_signing_key: '',
      ip_address: validatorConfigResponse.data.ip_address,
      nickname: '',
      nid_signing_key: '',
      port: validatorConfigResponse.data.port,
      protocol: validatorConfigResponse.data.protocol,
    };

    dispatch(setManagedValidator(activePrimaryValidatorData));

    if (!getIsActivePrimaryValidator(state, primaryValidatorAddress)) {
      dispatch(changeActivePrimaryValidator(activePrimaryValidatorData));
    }
  }

  return {
    address,
    bankConfig: bankConfig.data,
    validatorConfig: validatorConfigResponse.data,
  };
};

export const connectAndStoreLocalData = (bankAddressData: AddressData, bankNickname: string) => async (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const state = getState();

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

  const bankAddress = formatAddressFromNode(bankAddressData);
  if (getIsManagedBank(state, bankAddress)) {
    const managedBanks = getManagedBanks(state);
    const managedBank = managedBanks[bankAddress];
    const activeBankData = {
      ...managedBank,
      ip_address: bankConfig.ip_address,
      nickname: bankNickname,
      port: bankConfig.port,
      protocol: bankConfig.protocol,
    };

    dispatch(setManagedBank(activeBankData));

    if (!getIsActiveBank(state, bankAddress)) {
      dispatch(changeActiveBank(activeBankData));
    }
  } else {
    const activeBankData = {
      account_signing_key: '',
      ip_address: bankConfig.ip_address,
      nickname: bankNickname,
      nid_signing_key: '',
      port: bankConfig.port,
      protocol: bankConfig.protocol,
    };

    dispatch(setManagedBank(activeBankData));

    if (!getIsActiveBank(state, bankAddress)) {
      dispatch(changeActiveBank(activeBankData));
    }
  }

  const primaryValidatorAddress = formatAddressFromNode(validatorConfig);
  if (getIsManagedValidator(state, primaryValidatorAddress)) {
    const managedValidators = getManagedValidators(state);
    const managedValidator = managedValidators[primaryValidatorAddress];
    const activePrimaryValidatorData = {
      ...managedValidator,
      ip_address: validatorConfig.ip_address,
      node_identifier: validatorConfig.node_identifier,
      port: validatorConfig.port,
      protocol: validatorConfig.protocol,
    };
    dispatch(setManagedValidator(activePrimaryValidatorData));
    dispatch(changeActivePrimaryValidator(activePrimaryValidatorData));
  }

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

export const fetchAndDispatchPrimaryValidator = (primaryValidatorAddress: string) => async (
  dispatch: AppDispatch,
  getState: () => RootState,
): Promise<{error: any; validatorConfig: ValidatorConfig | null}> => {
  const state = getState();

  const validatorConfigResponse = await dispatch(fetchValidatorConfig(primaryValidatorAddress));
  if (validatorConfigResponse.error) {
    return {
      error: validatorConfigResponse.error,
      validatorConfig: null,
    };
  }

  if (!validatorConfigResponse.data) {
    throw new Error('No ValidatorConfig data');
  }

  if (getIsManagedValidator(state, primaryValidatorAddress)) {
    const managedValidators = getManagedValidators(state);
    const managedValidator = managedValidators[primaryValidatorAddress];
    const activePrimaryValidatorData = {
      ...managedValidator,
      ip_address: validatorConfigResponse.data.ip_address,
      node_identifier: validatorConfigResponse.data.node_identifier,
      port: validatorConfigResponse.data.port,
      protocol: validatorConfigResponse.data.protocol,
    };

    dispatch(setManagedValidator(activePrimaryValidatorData));

    if (!getIsActivePrimaryValidator(state, primaryValidatorAddress)) {
      dispatch(changeActivePrimaryValidator(activePrimaryValidatorData));
    }
  } else {
    const activePrimaryValidatorData = {
      account_signing_key: '',
      ip_address: validatorConfigResponse.data.ip_address,
      nickname: '',
      nid_signing_key: '',
      node_identifier: validatorConfigResponse.data.node_identifier,
      port: validatorConfigResponse.data.port,
      protocol: validatorConfigResponse.data.protocol,
    };

    dispatch(setManagedValidator(activePrimaryValidatorData));

    if (!getIsActivePrimaryValidator(state, primaryValidatorAddress)) {
      dispatch(changeActivePrimaryValidator(activePrimaryValidatorData));
    }
  }

  return {
    error: null,
    validatorConfig: validatorConfigResponse.data,
  };
};

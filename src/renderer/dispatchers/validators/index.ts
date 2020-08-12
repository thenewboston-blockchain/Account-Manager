import axios from 'axios';

import {ACCOUNTS, BANKS, VALIDATORS} from '@renderer/constants';
import {
  setValidatorAccounts,
  setValidatorAccountsError,
  setValidatorBanks,
  setValidatorBanksError,
  setValidatorConfig,
  setValidatorConfigError,
  setValidatorValidators,
  setValidatorValidatorsError,
} from '@renderer/store/validators';
import {AppDispatch, BaseValidator, NodeType, ValidatorAccount, ValidatorBank, ValidatorConfig} from '@renderer/types';
import {fetchPaginatedResults} from '@renderer/utils/api';

export const fetchValidatorAccounts = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<ValidatorAccount>(
    address,
    ACCOUNTS,
    dispatch,
    setValidatorAccounts,
    setValidatorAccountsError,
  );
};

export const fetchValidatorBanks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<ValidatorBank>(address, BANKS, dispatch, setValidatorBanks, setValidatorBanksError);
};

export const fetchValidatorConfig = (address: string) => async (dispatch: AppDispatch) => {
  try {
    const {data} = await axios.get<ValidatorConfig>(`${address}/config`);

    if (data.node_type !== NodeType.primaryValidator && data.node_type !== NodeType.confirmationValidator) {
      dispatch(setValidatorConfigError({address, error: 'Node not a validator'}));
      return;
    }

    dispatch(setValidatorConfig({address, data}));
    return data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setValidatorConfigError({address, error: error.response.data}));
  }
};

export const fetchValidatorValidators = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BaseValidator>(
    address,
    VALIDATORS,
    dispatch,
    setValidatorValidators,
    setValidatorValidatorsError,
  );
};

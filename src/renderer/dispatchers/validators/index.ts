import axios from 'axios';

import {
  setValidatorAccounts,
  setValidatorAccountsError,
  setValidatorConfig,
  setValidatorConfigError,
} from '@renderer/store/validators';
import {NodeType, PaginatedResults} from '@renderer/types/api';
import {NodeAccount, ValidatorConfig} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';

export const fetchValidatorAccounts = (address: string) => async (dispatch: AppDispatch) => {
  try {
    const {data} = await axios.get<PaginatedResults<NodeAccount>>(`${address}/accounts`);

    dispatch(setValidatorAccounts({address, ...data}));
    return data.results;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setValidatorAccountsError({address, error: error.response.data}));
  }
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

import axios from 'axios';

import {setBankAccounts, setBankAccountsError, setBankConfig, setBankConfigError} from '@renderer/store/banks';
import {NodeType, PaginatedResults} from '@renderer/types/api';
import {BankConfig, NodeAccount} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';

export const fetchBankAccounts = (address: string) => async (dispatch: AppDispatch) => {
  try {
    const {data} = await axios.get<PaginatedResults<NodeAccount>>(`${address}/accounts`);

    dispatch(setBankAccounts({address, ...data}));
    return data.results;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setBankAccountsError({address, error: error.response.data}));
  }
};

export const fetchBankConfig = (address: string) => async (dispatch: AppDispatch) => {
  try {
    const {data} = await axios.get<BankConfig>(`${address}/config`);

    if (data.node_type !== NodeType.bank) {
      dispatch(setBankConfigError({address, error: 'Node not a bank'}));
      return;
    }

    dispatch(setBankConfig({address, data}));
    return data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setBankConfigError({address, error: error.response.data}));
  }
};

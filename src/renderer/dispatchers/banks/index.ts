import axios from 'axios';

import {
  ACCOUNTS,
  BANK_TRANSACTIONS,
  BANKS,
  BLOCKS,
  CONFIRMATION_BLOCKS,
  INVALID_BLOCKS,
  VALIDATOR_CONFIRMATION_SERVICES,
  VALIDATORS,
} from '@renderer/constants/store';
import {
  setBankAccounts,
  setBankAccountsError,
  setBankBanks,
  setBankBanksError,
  setBankBankTransactions,
  setBankBankTransactionsError,
  setBankBlocks,
  setBankBlocksError,
  setBankConfig,
  setBankConfigError,
  setBankConfirmationBlocks,
  setBankConfirmationBlocksError,
  setBankInvalidBlocks,
  setBankInvalidBlocksError,
  setBankValidatorConfirmationServices,
  setBankValidatorConfirmationServicesError,
  setBankValidators,
  setBankValidatorsError,
} from '@renderer/store/banks';
import {NodeType} from '@renderer/types/api';
import {
  BankConfig,
  NetworkNode,
  NetworkValidator,
  NodeAccount,
  NodeBankTransaction,
  NodeBlock,
  NodeConfirmationBlock,
  NodeInvalidBlock,
  NodeValidatorConfirmationService,
} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';
import {fetchPaginatedResults} from '@renderer/utils/api';

export const fetchBankAccounts = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeAccount>(address, ACCOUNTS, dispatch, setBankAccounts, setBankAccountsError);
};

export const fetchBankBanks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NetworkNode>(address, BANKS, dispatch, setBankBanks, setBankBanksError);
};

export const fetchBankBankTransactions = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeBankTransaction>(
    address,
    BANK_TRANSACTIONS,
    dispatch,
    setBankBankTransactions,
    setBankBankTransactionsError,
  );
};

export const fetchBankBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeBlock>(address, BLOCKS, dispatch, setBankBlocks, setBankBlocksError);
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

export const fetchBankConfirmationBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeConfirmationBlock>(
    address,
    CONFIRMATION_BLOCKS,
    dispatch,
    setBankConfirmationBlocks,
    setBankConfirmationBlocksError,
  );
};

export const fetchBankInvalidBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeInvalidBlock>(
    address,
    INVALID_BLOCKS,
    dispatch,
    setBankInvalidBlocks,
    setBankInvalidBlocksError,
  );
};

export const fetchBankValidatorConfirmationServices = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeValidatorConfirmationService>(
    address,
    VALIDATOR_CONFIRMATION_SERVICES,
    dispatch,
    setBankValidatorConfirmationServices,
    setBankValidatorConfirmationServicesError,
  );
};

export const fetchBankValidators = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NetworkValidator>(
    address,
    VALIDATORS,
    dispatch,
    setBankValidators,
    setBankValidatorsError,
  );
};

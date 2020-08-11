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
} from '@renderer/constants';
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
import {
  AppDispatch,
  BankAccount,
  BankConfig,
  BankConfirmationBlock,
  BankTransaction,
  BaseValidator,
  BlockResponse,
  InvalidBlock,
  Node,
  NodeType,
  ValidatorConfirmationService,
} from '@renderer/types';
import {fetchPaginatedResults} from '@renderer/utils/api';

export const fetchBankAccounts = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BankAccount>(address, ACCOUNTS, dispatch, setBankAccounts, setBankAccountsError);
};

export const fetchBankBanks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<Node>(address, BANKS, dispatch, setBankBanks, setBankBanksError);
};

export const fetchBankBankTransactions = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BankTransaction>(
    address,
    BANK_TRANSACTIONS,
    dispatch,
    setBankBankTransactions,
    setBankBankTransactionsError,
  );
};

export const fetchBankBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BlockResponse>(address, BLOCKS, dispatch, setBankBlocks, setBankBlocksError);
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
  return fetchPaginatedResults<BankConfirmationBlock>(
    address,
    CONFIRMATION_BLOCKS,
    dispatch,
    setBankConfirmationBlocks,
    setBankConfirmationBlocksError,
  );
};

export const fetchBankInvalidBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<InvalidBlock>(
    address,
    INVALID_BLOCKS,
    dispatch,
    setBankInvalidBlocks,
    setBankInvalidBlocksError,
  );
};

export const fetchBankValidatorConfirmationServices = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<ValidatorConfirmationService>(
    address,
    VALIDATOR_CONFIRMATION_SERVICES,
    dispatch,
    setBankValidatorConfirmationServices,
    setBankValidatorConfirmationServicesError,
  );
};

export const fetchBankValidators = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BaseValidator>(address, VALIDATORS, dispatch, setBankValidators, setBankValidatorsError);
};

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
import {defaultPaginatedQueryParam} from '@renderer/config';
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
  PaginatedQueryParams,
  ValidatorConfirmationService,
} from '@renderer/types';
import {fetchPaginatedResults} from '@renderer/utils/api';

export const fetchBankAccounts = (address: string, params: PaginatedQueryParams = defaultPaginatedQueryParam) => async (
  dispatch: AppDispatch,
) => {
  return fetchPaginatedResults<BankAccount>(address, ACCOUNTS, params, dispatch, setBankAccounts, setBankAccountsError);
};

export const fetchBankBanks = (address: string, params: PaginatedQueryParams = defaultPaginatedQueryParam) => async (
  dispatch: AppDispatch,
) => {
  return fetchPaginatedResults<Node>(address, BANKS, params, dispatch, setBankBanks, setBankBanksError);
};

export const fetchBankBankTransactions = (
  address: string,
  params: PaginatedQueryParams = defaultPaginatedQueryParam,
) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BankTransaction>(
    address,
    BANK_TRANSACTIONS,
    params,
    dispatch,
    setBankBankTransactions,
    setBankBankTransactionsError,
  );
};

export const fetchBankBlocks = (address: string, params: PaginatedQueryParams = defaultPaginatedQueryParam) => async (
  dispatch: AppDispatch,
) => {
  return fetchPaginatedResults<BlockResponse>(address, BLOCKS, params, dispatch, setBankBlocks, setBankBlocksError);
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

export const fetchBankConfirmationBlocks = (
  address: string,
  params: PaginatedQueryParams = defaultPaginatedQueryParam,
) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BankConfirmationBlock>(
    address,
    CONFIRMATION_BLOCKS,
    params,
    dispatch,
    setBankConfirmationBlocks,
    setBankConfirmationBlocksError,
  );
};

export const fetchBankInvalidBlocks = (
  address: string,
  params: PaginatedQueryParams = defaultPaginatedQueryParam,
) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<InvalidBlock>(
    address,
    INVALID_BLOCKS,
    params,
    dispatch,
    setBankInvalidBlocks,
    setBankInvalidBlocksError,
  );
};

export const fetchBankValidatorConfirmationServices = (
  address: string,
  params: PaginatedQueryParams = defaultPaginatedQueryParam,
) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<ValidatorConfirmationService>(
    address,
    VALIDATOR_CONFIRMATION_SERVICES,
    params,
    dispatch,
    setBankValidatorConfirmationServices,
    setBankValidatorConfirmationServicesError,
  );
};

export const fetchBankValidators = (
  address: string,
  params: PaginatedQueryParams = defaultPaginatedQueryParam,
) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BaseValidator>(
    address,
    VALIDATORS,
    params,
    dispatch,
    setBankValidators,
    setBankValidatorsError,
  );
};

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
  setValidatorAccounts,
  setValidatorAccountsError,
  setValidatorBanks,
  setValidatorBanksError,
  setValidatorBankTransactions,
  setValidatorBankTransactionsError,
  setValidatorBlocks,
  setValidatorBlocksError,
  setValidatorConfig,
  setValidatorConfigError,
  setValidatorConfirmationBlocks,
  setValidatorConfirmationBlocksError,
  setValidatorInvalidBlocks,
  setValidatorInvalidBlocksError,
  setValidatorValidatorConfirmationServices,
  setValidatorValidatorConfirmationServicesError,
  setValidatorValidators,
  setValidatorValidatorsError,
} from '@renderer/store/validators';
import {
  AppDispatch,
  BankTransaction,
  BaseValidator,
  BlockResponse,
  InvalidBlock,
  Node,
  NodeType,
  ValidatorAccount,
  ValidatorConfig,
  ValidatorConfirmationBlock,
  ValidatorConfirmationService,
} from '@renderer/types';
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
  return fetchPaginatedResults<Node>(address, BANKS, dispatch, setValidatorBanks, setValidatorBanksError);
};

export const fetchValidatorBankTransactions = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BankTransaction>(
    address,
    BANK_TRANSACTIONS,
    dispatch,
    setValidatorBankTransactions,
    setValidatorBankTransactionsError,
  );
};

export const fetchValidatorBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<BlockResponse>(address, BLOCKS, dispatch, setValidatorBlocks, setValidatorBlocksError);
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

export const fetchValidatorConfirmationBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<ValidatorConfirmationBlock>(
    address,
    CONFIRMATION_BLOCKS,
    dispatch,
    setValidatorConfirmationBlocks,
    setValidatorConfirmationBlocksError,
  );
};

export const fetchValidatorInvalidBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<InvalidBlock>(
    address,
    INVALID_BLOCKS,
    dispatch,
    setValidatorInvalidBlocks,
    setValidatorInvalidBlocksError,
  );
};

export const fetchValidatorValidatorConfirmationServices = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<ValidatorConfirmationService>(
    address,
    VALIDATOR_CONFIRMATION_SERVICES,
    dispatch,
    setValidatorValidatorConfirmationServices,
    setValidatorValidatorConfirmationServicesError,
  );
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

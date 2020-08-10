import axios from 'axios';

import {
  ACCOUNTS,
  BANK_TRANSACTIONS,
  BANKS,
  CONFIRMATION_BLOCKS,
  INVALID_BLOCKS,
  VALIDATOR_CONFIRMATION_SERVICES,
  VALIDATORS,
} from '@renderer/constants/store';
import {
  setValidatorAccounts,
  setValidatorAccountsError,
  setValidatorBanks,
  setValidatorBanksError,
  setValidatorBankTransactions,
  setValidatorBankTransactionsError,
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
import {NodeType} from '@renderer/types/api';
import {
  NetworkNode,
  NetworkValidator,
  NodeAccount,
  NodeBankTransaction,
  NodeConfirmationBlock,
  NodeInvalidBlock,
  NodeValidatorConfirmationService,
  ValidatorConfig,
} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';
import {fetchPaginatedResults} from '@renderer/utils/api';

export const fetchValidatorAccounts = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeAccount>(
    address,
    ACCOUNTS,
    dispatch,
    setValidatorAccounts,
    setValidatorAccountsError,
  );
};

export const fetchValidatorBanks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NetworkNode>(address, BANKS, dispatch, setValidatorBanks, setValidatorBanksError);
};

export const fetchValidatorBankTransactions = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeBankTransaction>(
    address,
    BANK_TRANSACTIONS,
    dispatch,
    setValidatorBankTransactions,
    setValidatorBankTransactionsError,
  );
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
  return fetchPaginatedResults<NodeConfirmationBlock>(
    address,
    CONFIRMATION_BLOCKS,
    dispatch,
    setValidatorConfirmationBlocks,
    setValidatorConfirmationBlocksError,
  );
};

export const fetchValidatorInvalidBlocks = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeInvalidBlock>(
    address,
    INVALID_BLOCKS,
    dispatch,
    setValidatorInvalidBlocks,
    setValidatorInvalidBlocksError,
  );
};

export const fetchValidatorValidatorConfirmationServices = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NodeValidatorConfirmationService>(
    address,
    VALIDATOR_CONFIRMATION_SERVICES,
    dispatch,
    setValidatorValidatorConfirmationServices,
    setValidatorValidatorConfirmationServicesError,
  );
};

export const fetchValidatorValidators = (address: string) => async (dispatch: AppDispatch) => {
  return fetchPaginatedResults<NetworkValidator>(
    address,
    VALIDATORS,
    dispatch,
    setValidatorValidators,
    setValidatorValidatorsError,
  );
};

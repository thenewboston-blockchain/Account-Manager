import {combineReducers} from '@reduxjs/toolkit';

import {
  ACCOUNTS,
  BANK_TRANSACTIONS,
  BANKS,
  BLOCKS,
  CONFIGS,
  CONFIRMATION_BLOCKS,
  INVALID_BLOCKS,
  VALIDATOR_CONFIRMATION_SERVICES,
  VALIDATORS,
} from '@renderer/constants/store';
import bankAccounts, {setBankAccounts, setBankAccountsError, unsetBankAccounts} from './bankAccounts';
import bankBanks, {setBankBanks, setBankBanksError, unsetBankBanks} from './bankBanks';
import bankBankTransactions, {
  setBankBankTransactions,
  setBankBankTransactionsError,
  unsetBankBankTransactions,
} from './bankBankTransactions';
import bankBlocks, {setBankBlocks, setBankBlocksError, unsetBankBlocks} from './bankBlocks';
import bankConfigs, {setBankConfig, setBankConfigError} from './bankConfigs';
import bankConfirmationBlocks, {
  setBankConfirmationBlocks,
  setBankConfirmationBlocksError,
  unsetBankConfirmationBlocks,
} from './bankConfirmationBlocks';
import bankInvalidBlocks, {
  setBankInvalidBlocks,
  setBankInvalidBlocksError,
  unsetBankInvalidBlocks,
} from './bankInvalidBlocks';
import bankValidatorConfirmationServices, {
  setBankValidatorConfirmationServices,
  setBankValidatorConfirmationServicesError,
  unsetBankValidatorConfirmationServices,
} from './bankValidatorConfirmationServices';
import bankValidators, {setBankValidators, setBankValidatorsError, unsetBankValidators} from './bankValidators';

export {
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
  unsetBankAccounts,
  unsetBankBanks,
  unsetBankBankTransactions,
  unsetBankBlocks,
  unsetBankConfirmationBlocks,
  unsetBankInvalidBlocks,
  unsetBankValidatorConfirmationServices,
  unsetBankValidators,
};

const bankReducers = combineReducers({
  [ACCOUNTS]: bankAccounts.reducer,
  [BANK_TRANSACTIONS]: bankBankTransactions.reducer,
  [BANKS]: bankBanks.reducer,
  [BLOCKS]: bankBlocks.reducer,
  [CONFIGS]: bankConfigs.reducer,
  [CONFIRMATION_BLOCKS]: bankConfirmationBlocks.reducer,
  [INVALID_BLOCKS]: bankInvalidBlocks.reducer,
  [VALIDATOR_CONFIRMATION_SERVICES]: bankValidatorConfirmationServices.reducer,
  [VALIDATORS]: bankValidators.reducer,
});

export default bankReducers;

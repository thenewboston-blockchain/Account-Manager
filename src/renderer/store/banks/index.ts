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
} from '@renderer/constants/actions';
import bankAccountsReducer, {setBankAccounts, setBankAccountsError, unsetBankAccounts} from './bankAccounts';
import bankBanksReducer, {setBankBanks, setBankBanksError, unsetBankBanks} from './bankBanks';
import bankBankTransactionsReducer, {
  setBankBankTransactions,
  setBankBankTransactionsError,
  unsetBankBankTransactions,
} from './bankBankTransactions';
import bankBlocksReducer, {setBankBlocks, setBankBlocksError, unsetBankBlocks} from './bankBlocks';
import bankConfigsReducer, {setBankConfig, setBankConfigError} from './bankConfigs';
import bankConfirmationBlocksReducer, {
  setBankConfirmationBlocks,
  setBankConfirmationBlocksError,
  unsetBankConfirmationBlocks,
} from './bankConfirmationBlocks';
import bankInvalidBlocksReducer, {
  setBankInvalidBlocks,
  setBankInvalidBlocksError,
  unsetBankInvalidBlocks,
} from './bankInvalidBlocks';
import bankValidatorConfirmationServicesReducer, {
  setBankValidatorConfirmationServices,
  setBankValidatorConfirmationServicesError,
  unsetBankValidatorConfirmationServices,
} from './bankValidatorConfirmationServices';
import bankValidatorsReducer, {setBankValidators, setBankValidatorsError, unsetBankValidators} from './bankValidators';

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
  [ACCOUNTS]: bankAccountsReducer,
  [BANK_TRANSACTIONS]: bankBankTransactionsReducer,
  [BANKS]: bankBanksReducer,
  [BLOCKS]: bankBlocksReducer,
  [CONFIGS]: bankConfigsReducer,
  [CONFIRMATION_BLOCKS]: bankConfirmationBlocksReducer,
  [INVALID_BLOCKS]: bankInvalidBlocksReducer,
  [VALIDATOR_CONFIRMATION_SERVICES]: bankValidatorConfirmationServicesReducer,
  [VALIDATORS]: bankValidatorsReducer,
});

export default bankReducers;

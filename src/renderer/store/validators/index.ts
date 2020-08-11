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
} from '@renderer/constants';
import validatorAccounts, {
  setValidatorAccounts,
  setValidatorAccountsError,
  unsetValidatorAccounts,
} from './validatorAccounts';
import validatorBanks, {setValidatorBanks, setValidatorBanksError, unsetValidatorBanks} from './validatorBanks';
import validatorBankTransactions, {
  setValidatorBankTransactions,
  setValidatorBankTransactionsError,
  unsetValidatorBankTransactions,
} from './validatorBankTransactions';
import validatorBlocks, {setValidatorBlocks, setValidatorBlocksError, unsetValidatorBlocks} from './validatorBlocks';
import validatorConfigs, {setValidatorConfig, setValidatorConfigError} from './validatorConfigs';
import validatorConfirmationBlocks, {
  setValidatorConfirmationBlocks,
  setValidatorConfirmationBlocksError,
  unsetValidatorConfirmationBlocks,
} from './validatorConfirmationBlocks';
import validatorInvalidBlocks, {
  setValidatorInvalidBlocks,
  setValidatorInvalidBlocksError,
  unsetValidatorInvalidBlocks,
} from './validatorInvalidBlocks';
import validatorValidatorConfirmationServices, {
  setValidatorValidatorConfirmationServices,
  setValidatorValidatorConfirmationServicesError,
  unsetValidatorValidatorConfirmationServices,
} from './validatorValidatorConfirmationServices';
import validatorValidators, {
  setValidatorValidators,
  setValidatorValidatorsError,
  unsetValidatorValidators,
} from './validatorValidators';

export {
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
  unsetValidatorAccounts,
  unsetValidatorBanks,
  unsetValidatorBankTransactions,
  unsetValidatorBlocks,
  unsetValidatorConfirmationBlocks,
  unsetValidatorInvalidBlocks,
  unsetValidatorValidatorConfirmationServices,
  unsetValidatorValidators,
};

const validatorReducers = combineReducers({
  [ACCOUNTS]: validatorAccounts.reducer,
  [BANK_TRANSACTIONS]: validatorBankTransactions.reducer,
  [BANKS]: validatorBanks.reducer,
  [BLOCKS]: validatorBlocks.reducer,
  [CONFIGS]: validatorConfigs.reducer,
  [CONFIRMATION_BLOCKS]: validatorConfirmationBlocks.reducer,
  [INVALID_BLOCKS]: validatorInvalidBlocks.reducer,
  [VALIDATOR_CONFIRMATION_SERVICES]: validatorValidatorConfirmationServices.reducer,
  [VALIDATORS]: validatorValidators.reducer,
});

export default validatorReducers;

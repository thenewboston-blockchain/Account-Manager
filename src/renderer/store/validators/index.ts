import {combineReducers} from '@reduxjs/toolkit';

import {ACCOUNTS, BANKS, CONFIGS, VALIDATORS} from '@renderer/constants';
import validatorAccounts, {
  setValidatorAccounts,
  setValidatorAccountsError,
  unsetValidatorAccounts,
} from './validatorAccounts';
import validatorBanks, {setValidatorBanks, setValidatorBanksError, unsetValidatorBanks} from './validatorBanks';
import validatorConfigs, {setValidatorConfig, setValidatorConfigError} from './validatorConfigs';
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
  setValidatorConfig,
  setValidatorConfigError,
  setValidatorValidators,
  setValidatorValidatorsError,
  unsetValidatorAccounts,
  unsetValidatorBanks,
  unsetValidatorValidators,
};

const validatorReducers = combineReducers({
  [ACCOUNTS]: validatorAccounts.reducer,
  [BANKS]: validatorBanks.reducer,
  [CONFIGS]: validatorConfigs.reducer,
  [VALIDATORS]: validatorValidators.reducer,
});

export default validatorReducers;

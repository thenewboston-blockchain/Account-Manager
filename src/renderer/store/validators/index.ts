import {combineReducers} from '@reduxjs/toolkit';

import {ACCOUNTS, CONFIGS} from '@renderer/constants/store';
import validatorAccounts, {
  setValidatorAccounts,
  setValidatorAccountsError,
  unsetValidatorAccounts,
} from './validatorAccounts';
import validatorConfigs, {setValidatorConfig, setValidatorConfigError} from './validatorConfigs';

export {
  setValidatorAccounts,
  setValidatorAccountsError,
  setValidatorConfig,
  setValidatorConfigError,
  unsetValidatorAccounts,
};

const validatorReducers = combineReducers({
  [ACCOUNTS]: validatorAccounts.reducer,
  [CONFIGS]: validatorConfigs.reducer,
});

export default validatorReducers;

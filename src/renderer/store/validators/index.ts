import {combineReducers} from '@reduxjs/toolkit';

import {ACCOUNTS, BANKS, CONFIGS, VALIDATORS} from '@renderer/constants/actions';
import validatorAccountsReducer, {
  setValidatorAccounts,
  setValidatorAccountsError,
  unsetValidatorAccounts,
} from './validatorAccounts';
import validatorBanksReducer, {setValidatorBanks, setValidatorBanksError, unsetValidatorBanks} from './validatorBanks';
import validatorConfigsReducer, {setValidatorConfig, setValidatorConfigError} from './validatorConfigs';
import validatorValidatorsReducer, {
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
  [ACCOUNTS]: validatorAccountsReducer,
  [BANKS]: validatorBanksReducer,
  [CONFIGS]: validatorConfigsReducer,
  [VALIDATORS]: validatorValidatorsReducer,
});

export default validatorReducers;

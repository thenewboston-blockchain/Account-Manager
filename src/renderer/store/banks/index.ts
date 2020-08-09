import {combineReducers} from '@reduxjs/toolkit';

import {ACCOUNTS, CONFIGS} from '@renderer/constants/store';
import bankAccounts, {setBankAccounts, setBankAccountsError, unsetBankAccounts} from './bankAccounts';
import bankConfigs, {setBankConfig, setBankConfigError} from './bankConfigs';

export {setBankAccounts, setBankAccountsError, setBankConfig, setBankConfigError, unsetBankAccounts};

const bankReducers = combineReducers({
  [ACCOUNTS]: bankAccounts.reducer,
  [CONFIGS]: bankConfigs.reducer,
});

export default bankReducers;

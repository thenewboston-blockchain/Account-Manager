import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MANAGED_ACCOUNTS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedAccount, ManagedAccountBalance} from '@renderer/types';
import {
  clearLocalAndStateReducer,
  getStateName,
  setLocalAndAccountReducer,
  unsetLocalAndAccountReducer,
} from '@renderer/utils/store';

const managedAccounts = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_ACCOUNTS)) || {}) as Dict<ManagedAccount>,
  name: MANAGED_ACCOUNTS,
  reducers: {
    clearManagedAccounts: clearLocalAndStateReducer(),
    setManagedAccount: setLocalAndAccountReducer<ManagedAccount>(MANAGED_ACCOUNTS),
    setManagedAccountBalance: (state: any, {payload}: PayloadAction<ManagedAccountBalance>) => {
      const {account_number: accountNumber} = payload;
      const account = state[accountNumber];
      state[accountNumber] = {...account, ...payload};
      localStore.set(getStateName(MANAGED_ACCOUNTS), state);
    },
    unsetManagedAccount: unsetLocalAndAccountReducer(MANAGED_ACCOUNTS),
  },
});

export const {
  clearManagedAccounts,
  setManagedAccount,
  setManagedAccountBalance,
  unsetManagedAccount,
} = managedAccounts.actions;

export default managedAccounts;

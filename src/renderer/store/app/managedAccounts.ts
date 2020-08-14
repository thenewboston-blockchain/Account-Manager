import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MANAGED_ACCOUNTS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedAccount} from '@renderer/types';
import {getStateName} from '@renderer/utils/store';

const managedAccounts = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_ACCOUNTS)) || {}) as Dict<ManagedAccount> | {},
  name: MANAGED_ACCOUNTS,
  reducers: {
    setManagedAccount: (state: any, action: PayloadAction<ManagedAccount>) => {
      const {account_number: accountNumber} = action.payload;
      const account = state[accountNumber];
      state[accountNumber] = account ? {account, ...action.payload} : action.payload;
      localStore.set(getStateName(MANAGED_ACCOUNTS), state);
    },
  },
});

export const {setManagedAccount} = managedAccounts.actions;

export default managedAccounts;

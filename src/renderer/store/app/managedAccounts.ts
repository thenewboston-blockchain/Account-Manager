import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_ACCOUNTS} from '@renderer/constants/actions';
import localStore from '@renderer/store/local';
import {Dict, ManagedAccount} from '@renderer/types';
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
    unsetManagedAccount: unsetLocalAndAccountReducer(MANAGED_ACCOUNTS),
  },
});

export const {clearManagedAccounts, setManagedAccount, unsetManagedAccount} = managedAccounts.actions;

export default managedAccounts.reducer;

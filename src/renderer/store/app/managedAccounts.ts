import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_ACCOUNTS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedAccount} from '@renderer/types';
import {getStateName, setAccountLocalAndStateReducer, unsetAccountLocalAndStateReducer} from '@renderer/utils/store';

const managedAccounts = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_ACCOUNTS)) || {}) as Dict<ManagedAccount>,
  name: MANAGED_ACCOUNTS,
  reducers: {
    setManagedAccount: setAccountLocalAndStateReducer<ManagedAccount>(),
    unsetManagedAccount: unsetAccountLocalAndStateReducer(),
  },
});

export const {setManagedAccount, unsetManagedAccount} = managedAccounts.actions;

export default managedAccounts;

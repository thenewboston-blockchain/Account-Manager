import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_ACCOUNTS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {ManagedAccount} from '@renderer/types';
import {getStateName, setLocalAndStateArrayReducer} from '@renderer/utils/store';

const managedAccounts = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_ACCOUNTS)) || []) as ManagedAccount | [],
  name: MANAGED_ACCOUNTS,
  reducers: {
    setManagedAccount: setLocalAndStateArrayReducer<ManagedAccount>(),
  },
});

export const {setManagedAccount} = managedAccounts.actions;

export default managedAccounts;

import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_BANKS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {ManagedNode, Dict} from '@renderer/types';
import {getStateName, setNodeLocalAndStateReducer, unsetNodeLocalAndStateReducer} from '@renderer/utils/store';

const managedBanks = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_BANKS)) || {}) as Dict<ManagedNode>,
  name: MANAGED_BANKS,
  reducers: {
    setManagedBank: setNodeLocalAndStateReducer<ManagedNode>(),
    unsetManagedBank: unsetNodeLocalAndStateReducer(),
  },
});

export const {setManagedBank, unsetManagedBank} = managedBanks.actions;

export default managedBanks;

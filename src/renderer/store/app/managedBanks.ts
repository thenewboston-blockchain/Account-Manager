import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_BANKS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedNode} from '@renderer/types';
import {getStateName, setLocalAndAddressReducer, unsetLocalAndAddressReducer} from '@renderer/utils/store';

const managedBanks = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_BANKS)) || {}) as Dict<ManagedNode>,
  name: MANAGED_BANKS,
  reducers: {
    setManagedBank: setLocalAndAddressReducer<ManagedNode>(MANAGED_BANKS),
    unsetManagedBank: unsetLocalAndAddressReducer(MANAGED_BANKS),
  },
});

export const {setManagedBank, unsetManagedBank} = managedBanks.actions;

export default managedBanks;

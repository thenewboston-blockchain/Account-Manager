import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_VALIDATORS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedNode} from '@renderer/types';
import {
  clearLocalAndStateReducer,
  getStateName,
  setLocalAndAddressReducer,
  unsetActiveNodeReducer,
  unsetLocalAndAddressReducer,
} from '@renderer/utils/store';

const managedValidators = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_VALIDATORS)) || {}) as Dict<ManagedNode>,
  name: MANAGED_VALIDATORS,
  reducers: {
    clearManagedValidators: clearLocalAndStateReducer(),
    setManagedValidator: setLocalAndAddressReducer<ManagedNode>(MANAGED_VALIDATORS),
    unsetActivePrimaryValidator: unsetActiveNodeReducer(),
    unsetManagedValidator: unsetLocalAndAddressReducer(MANAGED_VALIDATORS),
  },
});

export const {
  clearManagedValidators,
  setManagedValidator,
  unsetActivePrimaryValidator,
  unsetManagedValidator,
} = managedValidators.actions;

export default managedValidators;

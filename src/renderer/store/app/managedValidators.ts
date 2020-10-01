import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_VALIDATORS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedNode} from '@renderer/types';
import {
  changeActiveNodeReducer,
  clearLocalAndStateReducer,
  getStateName,
  setLocalAndAddressReducer,
  unsetLocalAndAddressReducer,
} from '@renderer/utils/store';

const managedValidators = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_VALIDATORS)) || {}) as Dict<ManagedNode>,
  name: MANAGED_VALIDATORS,
  reducers: {
    changeActivePrimaryValidator: changeActiveNodeReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_VALIDATORS),
    clearManagedValidators: clearLocalAndStateReducer(),
    setManagedValidator: setLocalAndAddressReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_VALIDATORS),
    unsetManagedValidator: unsetLocalAndAddressReducer(MANAGED_VALIDATORS),
  },
});

export const {
  changeActivePrimaryValidator,
  clearManagedValidators,
  setManagedValidator,
  unsetManagedValidator,
} = managedValidators.actions;

export default managedValidators;

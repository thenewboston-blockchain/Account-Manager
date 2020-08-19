import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_VALIDATORS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedNode} from '@renderer/types';
import {getStateName, setLocalAndAddressReducer, unsetLocalAndAddressReducer} from '@renderer/utils/store';

const managedValidators = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_VALIDATORS)) || {}) as Dict<ManagedNode>,
  name: MANAGED_VALIDATORS,
  reducers: {
    setManagedValidator: setLocalAndAddressReducer<ManagedNode>(MANAGED_VALIDATORS),
    unsetManagedValidator: unsetLocalAndAddressReducer(MANAGED_VALIDATORS),
  },
});

export const {setManagedValidator, unsetManagedValidator} = managedValidators.actions;

export default managedValidators;

import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_VALIDATORS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {ManagedValidator, Dict} from '@renderer/types';
import {getStateName, setNodeLocalAndStateReducer, unsetNodeLocalAndStateReducer} from '@renderer/utils/store';

const managedValidators = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_VALIDATORS)) || {}) as Dict<ManagedValidator>,
  name: MANAGED_VALIDATORS,
  reducers: {
    setManagedValidator: setNodeLocalAndStateReducer<ManagedValidator>(),
    unsetManagedValidator: unsetNodeLocalAndStateReducer(),
  },
});

export const {setManagedValidator, unsetManagedValidator} = managedValidators.actions;

export default managedValidators;

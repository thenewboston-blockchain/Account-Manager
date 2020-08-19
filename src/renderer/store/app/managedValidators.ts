import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_VALIDATORS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedNode} from '@renderer/types';
import {getStateName, setNodeLocalAndStateReducer, unsetNodeLocalAndStateReducer} from '@renderer/utils/store';

const managedValidators = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_VALIDATORS)) || {}) as Dict<ManagedNode>,
  name: MANAGED_VALIDATORS,
  reducers: {
    setManagedValidator: setNodeLocalAndStateReducer<ManagedNode>(),
    unsetManagedValidator: unsetNodeLocalAndStateReducer(),
  },
});

export const {setManagedValidator, unsetManagedValidator} = managedValidators.actions;

export default managedValidators;

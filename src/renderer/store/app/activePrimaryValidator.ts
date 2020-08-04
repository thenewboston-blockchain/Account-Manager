import {createSlice} from '@reduxjs/toolkit';

import {ACTIVE_PRIMARY_VALIDATOR} from '@renderer/constants/store';
import localStore from '@renderer/store/localStore';
import {ActivePrimaryValidator} from '@renderer/types/entities';
import {getStateName, setLocalAndStateReducer, unsetStateToNullReducer} from '@renderer/utils/store';

const activeBank = createSlice({
  initialState: (localStore.get(getStateName(ACTIVE_PRIMARY_VALIDATOR)) || null) as ActivePrimaryValidator | null,
  name: ACTIVE_PRIMARY_VALIDATOR,
  reducers: {
    setState: setLocalAndStateReducer,
    unsetState: unsetStateToNullReducer,
  },
});

export const {
  setState: setActivePrimaryValidatorState,
  unsetState: unsetActivePrimaryValidatorState,
} = activeBank.actions;

export default activeBank;

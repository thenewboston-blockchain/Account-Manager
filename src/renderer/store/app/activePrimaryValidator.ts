import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ACTIVE_PRIMARY_VALIDATOR} from '@renderer/constants/store';
import localStore from '@renderer/store/localStore';
import {ActivePrimaryValidator} from '@renderer/types/entities';

const activeBank = createSlice({
  initialState: null as ActivePrimaryValidator | null,
  name: ACTIVE_PRIMARY_VALIDATOR,
  reducers: {
    set: (state, {payload}: PayloadAction<ActivePrimaryValidator>) => {
      localStore.set(ACTIVE_PRIMARY_VALIDATOR, payload);
      return payload;
    },
  },
});

export const {set: setActivePrimaryValidator} = activeBank.actions;

export default activeBank;

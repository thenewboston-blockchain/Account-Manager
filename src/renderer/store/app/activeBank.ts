import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ACTIVE_BANK} from '@renderer/constants/store';
import localStore from '@renderer/store/localStore';
import {ActiveBank} from '@renderer/types/entities';

const activeBank = createSlice({
  initialState: null as ActiveBank | null,
  name: ACTIVE_BANK,
  reducers: {
    set: (state, {payload}: PayloadAction<ActiveBank>) => {
      localStore.set(ACTIVE_BANK, payload);
      return payload;
    },
  },
});

export const {set: setActiveBank} = activeBank.actions;

export default activeBank;

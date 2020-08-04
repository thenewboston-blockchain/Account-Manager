import {createSlice} from '@reduxjs/toolkit';

import {ACTIVE_BANK} from '@renderer/constants/store';
import {ActiveBank} from '@renderer/types/entities';
import {setLocalAndStateReducer} from '@renderer/utils/store';

const activeBank = createSlice({
  initialState: null as ActiveBank | null,
  name: ACTIVE_BANK,
  reducers: {
    setState: setLocalAndStateReducer,
  },
});

export const {setState: setActiveBankState} = activeBank.actions;

export default activeBank;

import {createSlice} from '@reduxjs/toolkit';

import {ACTIVE_BANK} from '@renderer/constants/store';
import localStore from '@renderer/store/localStore';
import {ActiveBank} from '@renderer/types/entities';
import {getStateName, setLocalAndStateReducer, unsetStateToNullReducer} from '@renderer/utils/store';

const activeBank = createSlice({
  initialState: (localStore.get(getStateName(ACTIVE_BANK)) || null) as ActiveBank | null,
  name: ACTIVE_BANK,
  reducers: {
    setActiveBank: setLocalAndStateReducer<ActiveBank>(),
    unsetActiveBank: unsetStateToNullReducer(),
  },
});

export const {setActiveBank, unsetActiveBank} = activeBank.actions;

export default activeBank;

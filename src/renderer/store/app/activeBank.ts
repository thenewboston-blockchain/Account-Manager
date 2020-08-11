import {createSlice} from '@reduxjs/toolkit';

import {ACTIVE_BANK} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {AppNodeAddressData} from '@renderer/types';
import {getStateName, setLocalAndStateReducer, unsetStateToNullReducer} from '@renderer/utils/store';

const activeBank = createSlice({
  initialState: (localStore.get(getStateName(ACTIVE_BANK)) || null) as AppNodeAddressData | null,
  name: ACTIVE_BANK,
  reducers: {
    setActiveBank: setLocalAndStateReducer<AppNodeAddressData>(),
    unsetActiveBank: unsetStateToNullReducer(),
  },
});

export const {setActiveBank, unsetActiveBank} = activeBank.actions;

export default activeBank;

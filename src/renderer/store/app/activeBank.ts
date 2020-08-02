import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {fetchActiveBank} from '@renderer/api/banks';
import {ACTIVE_BANK, APP} from '@renderer/constants/store';
import {ActiveBank} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {fulfilledReducer, pendingReducer, rejectedReducer} from '@renderer/utils/store';

type State = StateSlice<ActiveBank | null>;

const activeBank = createSlice({
  // extraReducers: (builder) => {
  //   builder.addCase(fetchActiveBank.pending, pendingReducer);
  //   builder.addCase(fetchActiveBank.fulfilled, fulfilledReducer);
  //   builder.addCase(fetchActiveBank.rejected, rejectedReducer);
  // },
  initialState: {
    currentRequestId: undefined,
    entities: null,
    error: null,
    loading: Loading.idle,
  } as State,
  name: `${APP}/${ACTIVE_BANK}`,
  reducers: {
    set: (state, action: PayloadAction<ActiveBank>) => {
      state.entities = action.payload;
    },
  },
});

export const {set: setActiveBank} = activeBank.actions;

export default activeBank;

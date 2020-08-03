import {createSlice} from '@reduxjs/toolkit';

import {fetchActiveBank} from '@renderer/api/banks';
import {ACTIVE_BANK} from '@renderer/constants/store';
import {ActiveBank} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {pendingReducer, rejectedReducer, setStateReducer} from '@renderer/utils/store';

type State = StateSlice<ActiveBank | null>;

const activeBank = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchActiveBank.pending, pendingReducer);
    builder.addCase(fetchActiveBank.rejected, rejectedReducer);
    builder.addCase(fetchActiveBank.fulfilled, setStateReducer);
  },
  initialState: {
    currentRequestId: undefined,
    entities: null,
    error: null,
    loading: Loading.idle,
  } as State,
  name: ACTIVE_BANK,
  reducers: {},
});

export default activeBank;

import {createSlice} from '@reduxjs/toolkit';

import {fetchActiveBank} from '@renderer/api/banks';
import {ACTIVE_BANK, APP} from '@renderer/constants/store';
import {SessionBank} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {pendingReducer, rejectedReducer, setStateReducer, sliceActionType} from '@renderer/utils/store';

type State = StateSlice<SessionBank | null>;

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
  name: sliceActionType(APP, ACTIVE_BANK),
  reducers: {},
});

export default activeBank;

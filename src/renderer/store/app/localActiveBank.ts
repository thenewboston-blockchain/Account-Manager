import {createSlice} from '@reduxjs/toolkit';

import {setLocalActiveBank} from '@renderer/api/local';
import {LOCAL_ACTIVE_BANK} from '@renderer/constants/store';
import localStore from '@renderer/store/localStore';
import {LocalActiveBank} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {pendingReducer, rejectedReducer, setStateReducer} from '@renderer/utils/store';

type State = StateSlice<LocalActiveBank | null>;

const localActiveBank = createSlice({
  extraReducers: (builder) => {
    builder.addCase(setLocalActiveBank.pending, pendingReducer);
    builder.addCase(setLocalActiveBank.rejected, rejectedReducer);
    builder.addCase(setLocalActiveBank.fulfilled, setStateReducer);
  },
  initialState: {
    currentRequestId: undefined,
    entities: localStore.get(LOCAL_ACTIVE_BANK) || null,
    error: null,
    loading: Loading.idle,
  } as State,
  name: LOCAL_ACTIVE_BANK,
  reducers: {},
});

export default localActiveBank;

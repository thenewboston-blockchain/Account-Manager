import {createSlice} from '@reduxjs/toolkit';

import {fetchBanks} from '@renderer/api/bank';
import {BANKS} from '@renderer/constants/store';
import {Bank} from '@renderer/types/entities/Bank';
import {Loading, StateSlice} from '@renderer/types/store';
import {fulfilledReducer, pendingReducer, rejectedReducer} from '@renderer/utils/store';

const banksSlice = createSlice({
  name: BANKS,
  initialState: {
    entities: [],
    loading: Loading.idle,
    currentRequestId: undefined,
    error: null,
  } as StateSlice<Bank[]>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.pending, pendingReducer);
    builder.addCase(fetchBanks.fulfilled, fulfilledReducer);
    builder.addCase(fetchBanks.rejected, rejectedReducer);
  },
});

export const sampleBanks: StateSlice<Bank[]> = {
  entities: [],
  loading: Loading.idle,
  currentRequestId: undefined,
  error: null,
};

export default banksSlice;

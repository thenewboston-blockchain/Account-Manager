import {createSlice} from '@reduxjs/toolkit';
import {fetchBanks} from '@renderer/api/old/bank';
import {Bank} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {fulfilledReducer, pendingReducer, rejectedReducer} from '@renderer/utils/store';

const banksSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.pending, pendingReducer);
    builder.addCase(fetchBanks.fulfilled, fulfilledReducer);
    builder.addCase(fetchBanks.rejected, rejectedReducer);
  },
  initialState: {
    currentRequestId: undefined,
    entities: [],
    error: null,
    loading: Loading.idle,
  } as StateSlice<Bank[]>,
  name: 'old/banks',
  reducers: {},
});

export const sampleBanks: StateSlice<Bank[]> = {
  currentRequestId: undefined,
  entities: [],
  error: null,
  loading: Loading.idle,
};

export default banksSlice;

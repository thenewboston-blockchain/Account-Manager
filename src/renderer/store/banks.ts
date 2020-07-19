import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Loading, RootState, StateSlice} from '@renderer/types/store';

interface Bank {
  account_number: string;
  ip_address: string;
  node_identifier: string;
  port: number | null;
  protocol: 'http' | 'https';
  version: string;
  default_transaction_fee: string;
  trust: string;
}

export const fetchBanks = createAsyncThunk<Bank[], void, {state: RootState}>(
  'banks/fetch',
  async (_, {getState, rejectWithValue, requestId}) => {
    const {currentRequestId, loading} = getState().banks;
    if (loading !== Loading.pending || requestId !== currentRequestId) return;

    try {
      const response = await axios.get('http://167.99.173.247/banks');
      return response.data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  },
);

const banksSlice = createSlice({
  name: 'banks',
  initialState: {
    entities: [],
    loading: Loading.idle,
    currentRequestId: undefined,
    error: null,
  } as StateSlice<Bank[]>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.pending, (state, {meta}) => {
      if (state.loading === Loading.idle) {
        state.loading = Loading.pending;
        state.currentRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchBanks.fulfilled, (state, {meta, payload}) => {
      const {requestId} = meta;
      if (state.loading === Loading.pending && state.currentRequestId === requestId) {
        state.loading = Loading.idle;
        state.entities = payload;
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(fetchBanks.rejected, (state, {error, meta}) => {
      const {requestId} = meta;
      if (state.loading === Loading.pending && state.currentRequestId === requestId) {
        state.loading = Loading.idle;
        state.error = error;
        state.currentRequestId = undefined;
      }
    });
  },
});

export const sampleBanks: StateSlice<Bank[]> = {
  entities: [],
  loading: Loading.idle,
  currentRequestId: undefined,
  error: null,
};

export default banksSlice;

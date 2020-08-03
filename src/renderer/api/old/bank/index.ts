import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import Bank from '@renderer/types/entities/Bank';
import {Loading, RootState} from '@renderer/types/store';

export const fetchBanks = createAsyncThunk<Bank[], void, {state: RootState}>(
  'old/Banks',
  async (_, {getState, rejectWithValue, requestId}) => {
    const {currentRequestId, loading} = getState().old.banks;
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

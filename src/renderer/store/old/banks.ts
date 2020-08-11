import {createSlice} from '@reduxjs/toolkit';
import {OldBank} from '@renderer/types';

const banksSlice = createSlice({
  initialState: [] as OldBank[],
  name: 'old/banks',
  reducers: {},
});

export default banksSlice;

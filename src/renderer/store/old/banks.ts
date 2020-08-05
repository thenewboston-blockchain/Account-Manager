import {createSlice} from '@reduxjs/toolkit';
import {Bank} from '@renderer/types/entities';

const banksSlice = createSlice({
  initialState: [] as Bank[],
  name: 'old/banks',
  reducers: {},
});

export default banksSlice;

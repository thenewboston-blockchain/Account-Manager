import {createSlice} from '@reduxjs/toolkit';

interface Bank {
  name: string;
  ipAddress: string;
}

const banks = createSlice({
  name: 'banks',
  initialState: [] as Bank[],
  reducers: {},
});

export const sampleBanks: Bank[] = [
  {name: 'Bank 1', ipAddress: '169.189.222.35'},
  {name: 'Bank 2', ipAddress: '242.96.35.2'},
];

export default banks;

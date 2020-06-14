import {createSlice} from '@reduxjs/toolkit';

interface Bank {
  account_number: string;
  ip_address: string;
  network_identifier: string;
  port?: number | null;
  protocol: 'http' | 'https';
  version: string;
  default_transaction_fee: string;
  registration_fee: string;
  trust: string;
}

const banks = createSlice({
  name: 'banks',
  initialState: [] as Bank[],
  reducers: {},
});

export const sampleBanks: Bank[] = [
  {
    account_number: '5e12967707909e62b2bb2036c209085a784fabbc3deccefee70052b6181c8ed8',
    ip_address: '192.168.1.232',
    network_identifier: 'd5356888dc9303e44ce52b1e06c3165a7759b9df1e6a6dfbd33ee1c3df1ab4d1',
    port: 8000,
    protocol: 'http',
    version: 'v1.0',
    default_transaction_fee: '1.0000000000000000',
    registration_fee: '2.0000000000000000',
    trust: '100.00',
  },
];

export default banks;

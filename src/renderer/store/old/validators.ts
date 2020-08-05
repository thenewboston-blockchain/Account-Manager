import {createSlice} from '@reduxjs/toolkit';

export interface Validator {
  account_number: string;
  ip_address: string;
  network_identifier: string;
  port?: number | null;
  protocol: 'http' | 'https';
  version: string;
  default_transaction_fee: string;
  registration_fee: string;
  root_account_file: string;
  root_account_file_hash: string;
  seed_block_hash: string;
  trust: string;
}

const validatorsSlice = createSlice({
  initialState: [] as Validator[],
  name: 'validators',
  reducers: {},
});

export default validatorsSlice;

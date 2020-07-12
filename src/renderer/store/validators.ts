import {createSlice} from '@reduxjs/toolkit';

interface Validator {
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

const validators = createSlice({
  initialState: [] as Validator[],
  name: 'validators',
  reducers: {},
});

export const sampleValidator: Validator[] = [
  {
    account_number: 'ad1f8845c6a1abb6011a2a434a079a087c460657aad54329a84b406dce8bf314',
    ip_address: '192.168.1.65',
    network_identifier: '3afdf37573f1a511def0bd85553404b7091a76bcd79cdcebba1310527b167521',
    port: 8000,
    protocol: 'http',
    version: 'v1.0',
    default_transaction_fee: '2.0000000000000000',
    registration_fee: '16.0000000000000000',
    root_account_file:
      'https://gist.githubusercontent.com/buckyroberts/519b5cb82a0a5b5d4ae8a2175b722520/raw/9237deb449e27cab93cb89ea3346ecdfc61fe9ea/0.json',
    root_account_file_hash: '4694e1ee1dcfd8ee5f989e59ae40a9f751812bf5ca52aca2766b322c4060672b',
    seed_block_hash: '0',
    trust: '100.00',
  },
];

export default validators;

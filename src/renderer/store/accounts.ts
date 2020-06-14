import {createSlice} from '@reduxjs/toolkit';

interface Account {
  account_number: string;
  balance: string;
  balance_lock: string;
}

const accounts = createSlice({
  name: 'accounts',
  initialState: [] as Account[],
  reducers: {},
});

export const sampleAccounts: Account[] = [
  {
    account_number: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
    balance: '4294967296.0000000000000000',
    balance_lock: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
  },
];

export default accounts;

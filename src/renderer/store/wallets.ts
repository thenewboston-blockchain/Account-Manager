import {createSlice} from '@reduxjs/toolkit';

interface Wallet {
  name: string;
  id: string;
}

const wallets = createSlice({
  name: 'wallets',
  initialState: [] as Wallet[],
  reducers: {},
});

export const sampleWallets: Wallet[] = [
  {name: 'Donations', id: '43hawrjkef342dc'},
  {name: 'Personal', id: '43hawrjkef342dd'},
  {name: 'Validator Income', id: '43hawrjkef342de'},
];

export default wallets;

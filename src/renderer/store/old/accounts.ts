import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import localStore from '@renderer/store/localStore';
import {Dict} from '@renderer/types';

export interface Account {
  accountNumber: string;
  nickname?: string;
}

const accountsSlice = createSlice({
  initialState: [] as Account[],
  name: 'accounts',
  reducers: {
    create: {
      prepare: (accountNumberHex, nickname, signingKeyHex) => {
        const accounts = localStore.get('accounts') as Account[];
        localStore.set('accounts', {
          ...accounts,
          [accountNumberHex]: {
            nickname: nickname || '',
            secretKey: signingKeyHex,
          },
        });
        return {
          payload: {
            accountNumber: accountNumberHex,
            nickname: nickname || '',
          },
        };
      },
      reducer: (state, action: PayloadAction<Account>) => {
        state.push(action.payload);
      },
    },
    get: {
      prepare: () => {
        const accountsFromStore = localStore.get('accounts') as Dict<Account>;
        const accountsArray = Object.entries(accountsFromStore).map(([accountNumber, {nickname}]) => ({
          accountNumber,
          nickname,
        }));
        return {
          payload: accountsArray,
        };
      },
      reducer: (state, action: PayloadAction<Account[]>) => action.payload,
    },
  },
});

export const {create: createAccount, get: getAccount} = accountsSlice.actions;

export default accountsSlice;

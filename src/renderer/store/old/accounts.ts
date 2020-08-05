import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {sign} from 'tweetnacl';
import localStore from '@renderer/store/localStore';
import {Data} from '@renderer/types/store';

export interface Account {
  accountNumber: string;
  nickname?: string;
}

const accountsSlice = createSlice({
  initialState: [] as Account[],
  name: 'accounts',
  reducers: {
    create: {
      prepare: (nickname = '') => {
        const accounts = localStore.get('accounts') as Account[];
        const {publicKey, secretKey} = sign.keyPair();
        const publicKeyHex = Buffer.from(publicKey).toString('hex');
        const secretKeyHex = Buffer.from(secretKey).toString('hex').slice(64);
        localStore.set('accounts', {
          ...accounts,
          [publicKeyHex]: {nickname: nickname || '', secretKey: secretKeyHex},
        });
        return {
          payload: {
            accountNumber: publicKeyHex,
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
        const accountsFromStore = localStore.get('accounts') as Data<Account>;
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

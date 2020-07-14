import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ElectronStore from 'electron-store';
import {sign} from 'tweetnacl';
import {Data} from '@renderer/types/store';

const electronStore = new ElectronStore({
  schema: {
    accounts: {
      type: 'object',
      default: {},
    },
  },
});

interface Account {
  accountNumber: string;
  nickname?: string;
}

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: [] as Account[],
  reducers: {
    create: {
      prepare: (nickname: string = '') => {
        const accounts = electronStore.get('accounts') as Account[];
        const {publicKey, secretKey} = sign.keyPair();
        const publicKeyHex = Buffer.from(publicKey).toString('hex');
        const secretKeyHex = Buffer.from(secretKey).toString('hex').slice(64);
        electronStore.set('accounts', {
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
        const accountsFromStore = electronStore.get('accounts') as Data<Account>;
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

export const sampleAccounts: Account[] = [
  {
    accountNumber: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
    nickname: 'hello',
  },
];

export const {create: createAccount, get: getAccount} = accountsSlice.actions;

export default accountsSlice;

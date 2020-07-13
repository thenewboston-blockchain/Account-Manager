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
  account_number: string;
  nickname?: string;
}

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {} as Data<Account>,
  reducers: {
    create: {
      reducer: (state, action: PayloadAction<string>) => {
        const {payload: nickname} = action;
        const accounts = electronStore.get('accounts') as Data<Account>;
        const {publicKey, secretKey} = sign.keyPair();
        const publicKeyHex = Buffer.from(publicKey).toString('hex');
        const secretKeyHex = Buffer.from(secretKey).toString('hex').slice(64);
        electronStore.set('accounts', {
          ...accounts,
          [publicKeyHex]: {
            nickname,
            secretKey: secretKeyHex,
          },
        });
        state[publicKeyHex] = {
          account_number: publicKeyHex,
          nickname,
        };
      },
      prepare: (nickname: string) => ({payload: nickname || ''}),
    },
    get: () => {
      const accounts = electronStore.get('accounts') as Data<Account>;
      return Object.entries(accounts).reduce(
        (acc, [accountNumber, account]) => ({
          ...acc,
          [accountNumber]: {
            account_number: accountNumber,
            nickname: account.nickname,
          },
        }),
        {},
      );
    },
  },
});

export const sampleAccounts: Data<Account> = {
  '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb': {
    account_number: '0cdd4ba04456ca169baca3d66eace869520c62fe84421329086e03d91a68acdb',
    nickname: 'hello',
  },
};

export const {create: createAccount, get: getAccount} = accountsSlice.actions;

export default accountsSlice;

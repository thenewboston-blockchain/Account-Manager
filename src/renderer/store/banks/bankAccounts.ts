import {createSlice} from '@reduxjs/toolkit';

import {BANK_ACCOUNTS} from '@renderer/constants/store';
import {DataWithError} from '@renderer/types/store';
import {NodeAccount} from '@renderer/types/entities';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankAccounts = createSlice({
  initialState: {} as DataWithError<NodeAccount[]>,
  name: BANK_ACCOUNTS,
  reducers: {
    setBankAccounts: setDataReducer<NodeAccount[]>(),
    setBankAccountsError: setErrorReducer(),
    unsetBankAccounts: unsetDataReducer(),
  },
});

export const {setBankAccounts, setBankAccountsError, unsetBankAccounts} = bankAccounts.actions;

export default bankAccounts;

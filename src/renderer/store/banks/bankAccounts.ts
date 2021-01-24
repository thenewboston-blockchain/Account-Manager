import {createSlice} from '@reduxjs/toolkit';

import {BANK_ACCOUNTS} from '@renderer/constants/actions';
import {BankAccount, DictWithPaginatedResultsAndError} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const bankAccounts = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BankAccount>,
  name: BANK_ACCOUNTS,
  reducers: {
    setBankAccounts: setPaginatedResultReducer<BankAccount>(),
    setBankAccountsError: setPaginatedResultErrorReducer(),
    unsetBankAccounts: unsetDataReducer(),
  },
});

export const {setBankAccounts, setBankAccountsError, unsetBankAccounts} = bankAccounts.actions;

export default bankAccounts.reducer;

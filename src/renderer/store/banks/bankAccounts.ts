import {createSlice} from '@reduxjs/toolkit';

import {BANK_ACCOUNTS} from '@renderer/constants/store';
import {NodeAccount} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankAccounts = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeAccount>,
  name: BANK_ACCOUNTS,
  reducers: {
    setBankAccounts: setPaginatedResultReducer<NodeAccount>(),
    setBankAccountsError: setPaginatedResultErrorReducer(),
    unsetBankAccounts: unsetDataReducer(),
  },
});

export const {setBankAccounts, setBankAccountsError, unsetBankAccounts} = bankAccounts.actions;

export default bankAccounts;

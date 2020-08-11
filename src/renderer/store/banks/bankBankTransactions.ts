import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANK_TRANSACTIONS} from '@renderer/constants';
import {BankTransaction, DictWithPaginatedResultsAndError} from '@renderer/types';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankBankTransactions = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BankTransaction>,
  name: BANK_BANK_TRANSACTIONS,
  reducers: {
    setBankBankTransactions: setPaginatedResultReducer<BankTransaction>(),
    setBankBankTransactionsError: setPaginatedResultErrorReducer(),
    unsetBankBankTransactions: unsetDataReducer(),
  },
});

export const {
  setBankBankTransactions,
  setBankBankTransactionsError,
  unsetBankBankTransactions,
} = bankBankTransactions.actions;

export default bankBankTransactions;

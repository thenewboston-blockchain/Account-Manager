import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANK_TRANSACTIONS} from '@renderer/constants/store';
import {NodeBankTransaction} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankBankTransactions = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeBankTransaction>,
  name: BANK_BANK_TRANSACTIONS,
  reducers: {
    setBankBankTransactions: setPaginatedResultReducer<NodeBankTransaction>(),
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

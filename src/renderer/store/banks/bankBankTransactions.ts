import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANK_TRANSACTIONS} from '@renderer/constants/store';
import {NodeBankTransaction} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankBankTransactions = createSlice({
  initialState: {} as DataWithError<NodeBankTransaction[]>,
  name: BANK_BANK_TRANSACTIONS,
  reducers: {
    setBankBankTransactions: setDataReducer<NodeBankTransaction[]>(),
    setBankBankTransactionsError: setErrorReducer(),
    unsetBankBankTransactions: unsetDataReducer(),
  },
});

export const {
  setBankBankTransactions,
  setBankBankTransactionsError,
  unsetBankBankTransactions,
} = bankBankTransactions.actions;

export default bankBankTransactions;

import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BANK_TRANSACTIONS} from '@renderer/constants';
import {BankTransaction, DictWithPaginatedResultsAndError} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorBankTransactions = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BankTransaction>,
  name: VALIDATOR_BANK_TRANSACTIONS,
  reducers: {
    setValidatorBankTransactions: setPaginatedResultReducer<BankTransaction>(),
    setValidatorBankTransactionsError: setPaginatedResultErrorReducer(),
    unsetValidatorBankTransactions: unsetDataReducer(),
  },
});

export const {
  setValidatorBankTransactions,
  setValidatorBankTransactionsError,
  unsetValidatorBankTransactions,
} = validatorBankTransactions.actions;

export default validatorBankTransactions;

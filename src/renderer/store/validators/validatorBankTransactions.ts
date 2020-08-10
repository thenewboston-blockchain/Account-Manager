import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BANK_TRANSACTIONS} from '@renderer/constants/store';
import {NodeBankTransaction} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorBankTransactions = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeBankTransaction>,
  name: VALIDATOR_BANK_TRANSACTIONS,
  reducers: {
    setValidatorBankTransactions: setPaginatedResultReducer<NodeBankTransaction>(),
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

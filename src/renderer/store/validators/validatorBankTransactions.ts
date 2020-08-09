import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BANK_TRANSACTIONS} from '@renderer/constants/store';
import {NodeBankTransaction} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorBankTransactions = createSlice({
  initialState: {} as DataWithError<NodeBankTransaction[]>,
  name: VALIDATOR_BANK_TRANSACTIONS,
  reducers: {
    setValidatorBankTransactions: setDataReducer<NodeBankTransaction[]>(),
    setValidatorBankTransactionsError: setErrorReducer(),
    unsetValidatorBankTransactions: unsetDataReducer(),
  },
});

export const {
  setValidatorBankTransactions,
  setValidatorBankTransactionsError,
  unsetValidatorBankTransactions,
} = validatorBankTransactions.actions;

export default validatorBankTransactions;

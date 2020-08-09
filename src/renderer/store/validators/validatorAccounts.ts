import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_ACCOUNTS} from '@renderer/constants/store';
import {DataWithError} from '@renderer/types/store';
import {NodeAccount} from '@renderer/types/entities';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorAccounts = createSlice({
  initialState: {} as DataWithError<NodeAccount[]>,
  name: VALIDATOR_ACCOUNTS,
  reducers: {
    setValidatorAccounts: setDataReducer<NodeAccount[]>(),
    setValidatorAccountsError: setErrorReducer(),
    unsetValidatorAccounts: unsetDataReducer(),
  },
});

export const {setValidatorAccounts, setValidatorAccountsError, unsetValidatorAccounts} = validatorAccounts.actions;

export default validatorAccounts;

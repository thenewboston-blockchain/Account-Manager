import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_ACCOUNTS} from '@renderer/constants/store';
import {NodeAccount} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorAccounts = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeAccount>,
  name: VALIDATOR_ACCOUNTS,
  reducers: {
    setValidatorAccounts: setPaginatedResultReducer<NodeAccount>(),
    setValidatorAccountsError: setPaginatedResultErrorReducer(),
    unsetValidatorAccounts: unsetDataReducer(),
  },
});

export const {setValidatorAccounts, setValidatorAccountsError, unsetValidatorAccounts} = validatorAccounts.actions;

export default validatorAccounts;

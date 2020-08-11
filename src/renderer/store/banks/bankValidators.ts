import {createSlice} from '@reduxjs/toolkit';

import {BANK_VALIDATORS} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, NetworkValidator} from '@renderer/types';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankValidators = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NetworkValidator>,
  name: BANK_VALIDATORS,
  reducers: {
    setBankValidators: setPaginatedResultReducer<NetworkValidator>(),
    setBankValidatorsError: setPaginatedResultErrorReducer(),
    unsetBankValidators: unsetDataReducer(),
  },
});

export const {setBankValidators, setBankValidatorsError, unsetBankValidators} = bankValidators.actions;

export default bankValidators;

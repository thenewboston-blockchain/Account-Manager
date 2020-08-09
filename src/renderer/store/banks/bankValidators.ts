import {createSlice} from '@reduxjs/toolkit';

import {BANK_VALIDATORS} from '@renderer/constants/store';
import {NetworkValidator} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankValidators = createSlice({
  initialState: {} as DataWithError<NetworkValidator[]>,
  name: BANK_VALIDATORS,
  reducers: {
    setBankValidators: setDataReducer<NetworkValidator[]>(),
    setBankValidatorsError: setErrorReducer(),
    unsetBankValidators: unsetDataReducer(),
  },
});

export const {setBankValidators, setBankValidatorsError, unsetBankValidators} = bankValidators.actions;

export default bankValidators;

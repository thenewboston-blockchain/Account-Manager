import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_VALIDATORS} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, NetworkValidator} from '@renderer/types';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorValidators = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NetworkValidator>,
  name: VALIDATOR_VALIDATORS,
  reducers: {
    setValidatorValidators: setPaginatedResultReducer<NetworkValidator>(),
    setValidatorValidatorsError: setPaginatedResultErrorReducer(),
    unsetValidatorValidators: unsetDataReducer(),
  },
});

export const {
  setValidatorValidators,
  setValidatorValidatorsError,
  unsetValidatorValidators,
} = validatorValidators.actions;

export default validatorValidators;

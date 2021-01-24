import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_VALIDATORS} from '@renderer/constants/actions';
import {BaseValidator, DictWithPaginatedResultsAndError} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorValidators = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BaseValidator>,
  name: VALIDATOR_VALIDATORS,
  reducers: {
    setValidatorValidators: setPaginatedResultReducer<BaseValidator>(),
    setValidatorValidatorsError: setPaginatedResultErrorReducer(),
    unsetValidatorValidators: unsetDataReducer(),
  },
});

export const {
  setValidatorValidators,
  setValidatorValidatorsError,
  unsetValidatorValidators,
} = validatorValidators.actions;

export default validatorValidators.reducer;

import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_VALIDATORS} from '@renderer/constants/store';
import {NetworkValidator} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorValidators = createSlice({
  initialState: {} as DataWithError<NetworkValidator[]>,
  name: VALIDATOR_VALIDATORS,
  reducers: {
    setValidatorValidators: setDataReducer<NetworkValidator[]>(),
    setValidatorValidatorsError: setErrorReducer(),
    unsetValidatorValidators: unsetDataReducer(),
  },
});

export const {
  setValidatorValidators,
  setValidatorValidatorsError,
  unsetValidatorValidators,
} = validatorValidators.actions;

export default validatorValidators;

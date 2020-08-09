import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIGS} from '@renderer/constants/store';
import {ValidatorConfig} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer} from '@renderer/utils/store';

const validatorConfigs = createSlice({
  initialState: {} as DataWithError<ValidatorConfig>,
  name: VALIDATOR_CONFIGS,
  reducers: {
    setValidatorConfig: setDataReducer<ValidatorConfig>(),
    setValidatorConfigError: setErrorReducer(),
  },
});

export const {setValidatorConfig, setValidatorConfigError} = validatorConfigs.actions;

export default validatorConfigs;

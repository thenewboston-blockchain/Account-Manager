import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIGS} from '@renderer/constants/store';
import {ValidatorConfig} from '@renderer/types/entities';
import {DictWithDataAndError} from '@renderer/types/store';
import {setDataReducer, setDataErrorReducer} from '@renderer/utils/store';

const validatorConfigs = createSlice({
  initialState: {} as DictWithDataAndError<ValidatorConfig>,
  name: VALIDATOR_CONFIGS,
  reducers: {
    setValidatorConfig: setDataReducer<ValidatorConfig>(),
    setValidatorConfigError: setDataErrorReducer(),
  },
});

export const {setValidatorConfig, setValidatorConfigError} = validatorConfigs.actions;

export default validatorConfigs;

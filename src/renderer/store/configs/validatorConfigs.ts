import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIGS} from '@renderer/constants/store';
import {PrimaryValidatorConfig} from '@renderer/types/entities';
import {Data} from '@renderer/types/store';
import {setNodeReducer} from '@renderer/utils/store';

const validatorConfigs = createSlice({
  initialState: {} as Data<PrimaryValidatorConfig>,
  name: VALIDATOR_CONFIGS,
  reducers: {
    setValidatorConfig: setNodeReducer<PrimaryValidatorConfig>(),
  },
});

export const {setValidatorConfig} = validatorConfigs.actions;

export default validatorConfigs;

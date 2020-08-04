import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIGS} from '@renderer/constants/store';
import {ValidatorConfig} from '@renderer/types/entities';
import {Data} from '@renderer/types/store';
import {setNodeReducer} from '@renderer/utils/store';

const validatorConfigs = createSlice({
  initialState: {} as Data<ValidatorConfig>,
  name: VALIDATOR_CONFIGS,
  reducers: {
    set: setNodeReducer,
  },
});

export const {set: setValidatorConfig} = validatorConfigs.actions;

export default validatorConfigs;

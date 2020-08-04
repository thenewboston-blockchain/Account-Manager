import {createSlice} from '@reduxjs/toolkit';

import {fetchValidatorConfig} from '@renderer/api/configs/validatorConfigs';
import {VALIDATOR_CONFIGS} from '@renderer/constants/store';
import {ValidatorConfig} from '@renderer/types/entities';
import {Data} from '@renderer/types/store';
import {setNodeReducer} from '@renderer/utils/store';

const validatorConfigs = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchValidatorConfig.fulfilled, setNodeReducer);
  },
  initialState: {} as Data<ValidatorConfig>,
  name: VALIDATOR_CONFIGS,
  reducers: {},
});

export default validatorConfigs;

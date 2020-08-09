import {createSlice} from '@reduxjs/toolkit';

import {BANK_CONFIGS} from '@renderer/constants/store';
import {BankConfig} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer} from '@renderer/utils/store';

const bankConfigs = createSlice({
  initialState: {} as DataWithError<BankConfig>,
  name: BANK_CONFIGS,
  reducers: {
    setBankConfig: setDataReducer<BankConfig>(),
    setBankConfigError: setErrorReducer(),
  },
});

export const {setBankConfig, setBankConfigError} = bankConfigs.actions;

export default bankConfigs;

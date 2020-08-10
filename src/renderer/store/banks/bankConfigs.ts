import {createSlice} from '@reduxjs/toolkit';

import {BANK_CONFIGS} from '@renderer/constants/store';
import {BankConfig} from '@renderer/types/entities';
import {DictWithDataAndError} from '@renderer/types/store';
import {setDataReducer, setDataErrorReducer} from '@renderer/utils/store';

const bankConfigs = createSlice({
  initialState: {} as DictWithDataAndError<BankConfig>,
  name: BANK_CONFIGS,
  reducers: {
    setBankConfig: setDataReducer<BankConfig>(),
    setBankConfigError: setDataErrorReducer(),
  },
});

export const {setBankConfig, setBankConfigError} = bankConfigs.actions;

export default bankConfigs;

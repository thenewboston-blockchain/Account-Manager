import {createSlice} from '@reduxjs/toolkit';

import {BANK_CONFIGS} from '@renderer/constants/actions';
import {BankConfig, DictWithDataAndError} from '@renderer/types';
import {setDataErrorReducer, setDataReducer} from '@renderer/utils/store';

const bankConfigs = createSlice({
  initialState: {} as DictWithDataAndError<BankConfig>,
  name: BANK_CONFIGS,
  reducers: {
    setBankConfig: setDataReducer<BankConfig>(),
    setBankConfigError: setDataErrorReducer(),
  },
});

export const {setBankConfig, setBankConfigError} = bankConfigs.actions;

export default bankConfigs.reducer;

import {createSlice} from '@reduxjs/toolkit';

import {BANK_CONFIGS} from '@renderer/constants/store';
import {BankConfig} from '@renderer/types/entities';
import {Data} from '@renderer/types/store';
import {setNodeReducer} from '@renderer/utils/store';

const bankConfigs = createSlice({
  initialState: {} as Data<BankConfig>,
  name: BANK_CONFIGS,
  reducers: {
    set: setNodeReducer,
  },
});

export const {set: setBankConfig} = bankConfigs.actions;

export default bankConfigs;

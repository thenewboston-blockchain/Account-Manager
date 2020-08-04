import {createSlice} from '@reduxjs/toolkit';

import {fetchBankConfig} from '@renderer/api/configs/bankConfigs';
import {BANK_CONFIGS} from '@renderer/constants/store';
import {BankConfig} from '@renderer/types/entities';
import {Data} from '@renderer/types/store';
import {setNodeReducer} from '@renderer/utils/store';

const bankConfigs = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchBankConfig.fulfilled, setNodeReducer);
  },
  initialState: {} as Data<BankConfig>,
  name: BANK_CONFIGS,
  reducers: {},
});

export default bankConfigs;

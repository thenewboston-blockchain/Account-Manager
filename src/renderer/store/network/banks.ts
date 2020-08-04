import {createSlice} from '@reduxjs/toolkit';

import {NETWORK_BANKS} from '@renderer/constants/store';

const banks = createSlice({
  initialState: {},
  name: NETWORK_BANKS,
  reducers: {},
});

export default banks;

import {createSlice} from '@reduxjs/toolkit';

import {NETWORK_VALIDATORS} from '@renderer/constants/store';

const validators = createSlice({
  initialState: {},
  name: NETWORK_VALIDATORS,
  reducers: {},
});

export default validators;

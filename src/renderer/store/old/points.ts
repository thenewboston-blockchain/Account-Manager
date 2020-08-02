import {createSlice} from '@reduxjs/toolkit';

const pointsSlice = createSlice({
  initialState: 0 as number,
  name: 'points',
  reducers: {},
});

export const samplePoints = 25903.36;

export default pointsSlice;

import {createSlice} from '@reduxjs/toolkit';

interface Validator {
  ipAddress: string;
  name: string;
}

const validators = createSlice({
  initialState: [] as Validator[],
  name: 'validators',
  reducers: {},
});

export const sampleValidator: Validator[] = [
  {name: 'Validator A', ipAddress: '8.143.224.25'},
  {name: 'Validator B', ipAddress: '77.64.220.156'},
];

export default validators;

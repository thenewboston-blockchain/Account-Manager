import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ElectronStore from 'electron-store';

const electronStore = new ElectronStore({
  schema: {
    friends: {
      default: {},
      type: 'object',
    },
  },
});

export interface Friend {
  accountNumber: string;
  nickname?: string;
}

const friendsSlice = createSlice({
  initialState: [] as Friend[],
  name: 'friends',
  reducers: {
    create: {
      prepare: (accountNumber = '', nickname = '') => {
        electronStore.set('friends', {accountNumber, nickname});
        return {
          payload: {accountNumber, nickname},
        };
      },
      reducer: (state, action: PayloadAction<Friend>) => {
        state.push(action.payload);
      },
    },
  },
});

export const {create: createFriend} = friendsSlice.actions;

export default friendsSlice;

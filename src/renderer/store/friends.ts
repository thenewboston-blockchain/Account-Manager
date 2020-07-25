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
  name: string;
  id: string;
}

const friendsSlice = createSlice({
  initialState: [] as Friend[],
  name: 'friends',
  reducers: {
    create: {
      prepare: (name = '', id = '') => {
        electronStore.set('friends', {id, name});
        return {
          payload: {id, name},
        };
      },
      reducer: (state, action: PayloadAction<Friend>) => {
        state.push(action.payload);
      },
    },
  },
});

export const sampleFriends: Friend[] = [
  {id: '044de869fbf337', name: 'Amy'},
  {id: '4525JLK32E23E', name: 'Dave'},
];

export const {create: createFriend} = friendsSlice.actions;

export default friendsSlice;

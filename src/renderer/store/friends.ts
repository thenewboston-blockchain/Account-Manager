import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ElectronStore from 'electron-store';

const electronStore = new ElectronStore({
  schema: {
    friends: {
      type: 'object',
      default: {},
    },
  },
});

interface Friend {
  name: string;
  id: string;
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState: [] as Friend[],
  reducers: {
    create: {
      prepare: (name: string = '', id: string = '') => {
        electronStore.set('friends', {name, id});
        return {
          payload: {name, id},
        };
      },
      reducer: (state, action: PayloadAction<Friend>) => {
        state.push(action.payload);
      },
    },
  },
});

export const sampleFriends: Friend[] = [
  {name: 'Amy', id: '044de869fbf337'},
  {name: 'Dave', id: '4525JLK32E23E'},
];

export const {create: createFriend} = friendsSlice.actions;

export default friendsSlice;

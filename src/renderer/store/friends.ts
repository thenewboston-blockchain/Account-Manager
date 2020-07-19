import {createSlice} from '@reduxjs/toolkit';

interface Friend {
  name: string;
  id: string;
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState: [] as Friend[],
  reducers: {},
});

export const sampleFriends: Friend[] = [
  {name: 'Amy', id: '044de869fbf337'},
  {name: 'Dave', id: '4525JLK32E23E'},
];

export default friendsSlice;

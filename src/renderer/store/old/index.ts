import {combineReducers} from '@reduxjs/toolkit';

import banksSlice from '@renderer/store/old/banks';
import friendsSlice from '@renderer/store/old/friends';

export default combineReducers({
  banks: banksSlice.reducer,
  friends: friendsSlice.reducer,
});

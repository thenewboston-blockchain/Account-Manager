import {combineReducers} from '@reduxjs/toolkit';

import friendsSlice from '@renderer/store/old/friends';

export default combineReducers({
  friends: friendsSlice.reducer,
});

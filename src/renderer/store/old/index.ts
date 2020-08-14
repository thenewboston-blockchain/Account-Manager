import {combineReducers} from '@reduxjs/toolkit';

import banksSlice from '@renderer/store/old/banks';
import friendsSlice from '@renderer/store/old/friends';
import pointsSlice from '@renderer/store/old/points';
import validatorsSlice from '@renderer/store/old/validators';

export default combineReducers({
  banks: banksSlice.reducer,
  friends: friendsSlice.reducer,
  points: pointsSlice.reducer,
  validators: validatorsSlice.reducer,
});

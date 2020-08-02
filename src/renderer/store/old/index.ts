import {combineReducers} from '@reduxjs/toolkit';

import accountsSlice from '@renderer/store/old/accounts';
import banksSlice from '@renderer/store/old/banks';
import friendsSlice from '@renderer/store/old/friends';
import pointsSlice from '@renderer/store/old/points';
import validatorsSlice from '@renderer/store/old/validators';

export default combineReducers({
  accounts: accountsSlice.reducer,
  banks: banksSlice.reducer,
  friends: friendsSlice.reducer,
  points: pointsSlice.reducer,
  validators: validatorsSlice.reducer,
});

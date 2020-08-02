import {combineReducers} from '@reduxjs/toolkit';

import accountsSlice, {sampleAccounts} from '@renderer/store/old/accounts';
import banksSlice, {sampleBanks} from '@renderer/store/old/banks';
import friendsSlice, {sampleFriends} from '@renderer/store/old/friends';
import pointsSlice, {samplePoints} from '@renderer/store/old/points';
import validatorsSlice, {sampleValidator} from '@renderer/store/old/validators';

export const oldPreloadedState = {
  accounts: sampleAccounts,
  banks: sampleBanks,
  friends: sampleFriends,
  points: samplePoints,
  validators: sampleValidator,
};

export default combineReducers({
  accounts: accountsSlice.reducer,
  banks: banksSlice.reducer,
  friends: friendsSlice.reducer,
  points: pointsSlice.reducer,
  validators: validatorsSlice.reducer,
});

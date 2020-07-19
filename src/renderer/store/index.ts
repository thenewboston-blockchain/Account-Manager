import {configureStore} from '@reduxjs/toolkit';

import accountsSlice, {sampleAccounts} from '@renderer/store/accounts';
import banksSlice, {sampleBanks} from '@renderer/store/banks';
import friendsSlice, {sampleFriends} from '@renderer/store/friends';
import pointsSlice, {samplePoints} from '@renderer/store/points';
import validatorsSlice, {sampleValidator} from '@renderer/store/validators';

const preloadedState = {
  accounts: sampleAccounts,
  banks: sampleBanks,
  friends: sampleFriends,
  points: samplePoints,
  validators: sampleValidator,
};

export default configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
    banks: banksSlice.reducer,
    friends: friendsSlice.reducer,
    points: pointsSlice.reducer,
    validators: validatorsSlice.reducer,
  },
  preloadedState,
});

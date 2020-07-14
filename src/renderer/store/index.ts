import {configureStore} from '@reduxjs/toolkit';

import accountsSlice, {sampleAccounts} from '@renderer/store/accounts';
import banks, {sampleBanks} from '@renderer/store/banks';
import friends, {sampleFriends} from '@renderer/store/friends';
import points, {samplePoints} from '@renderer/store/points';
import validators, {sampleValidator} from '@renderer/store/validators';

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
    banks: banks.reducer,
    friends: friends.reducer,
    points: points.reducer,
    validators: validators.reducer,
  },
  preloadedState,
});

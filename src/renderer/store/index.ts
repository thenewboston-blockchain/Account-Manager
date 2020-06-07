import {configureStore} from '@reduxjs/toolkit';

import banks, {sampleBanks} from '@renderer/store/banks';
import friends, {sampleFriends} from '@renderer/store/friends';
import points, {samplePoints} from '@renderer/store/points';
import validators, {sampleValidator} from '@renderer/store/validators';
import wallets, {sampleWallets} from '@renderer/store/wallets';

const preloadedState = {
  banks: sampleBanks,
  points: samplePoints,
  friends: sampleFriends,
  validators: sampleValidator,
  wallets: sampleWallets,
};

export default configureStore({
  reducer: {
    banks: banks.reducer,
    friends: friends.reducer,
    points: points.reducer,
    validators: validators.reducer,
    wallets: wallets.reducer,
  },
  preloadedState,
});

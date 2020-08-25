import {combineReducers} from '@reduxjs/toolkit';

import managedAccounts, {setManagedAccount, unsetManagedAccount} from './managedAccounts';
import managedBanks, {setManagedBank, unsetActiveBank, unsetManagedBank} from './managedBanks';
import managedFriends, {setManagedFriend, unsetManagedFriend} from './managedFriends';
import managedValidators, {
  setManagedValidator,
  unsetActivePrimaryValidator,
  unsetManagedValidator,
} from './managedValidators';

export {
  setManagedAccount,
  setManagedBank,
  setManagedFriend,
  setManagedValidator,
  unsetActiveBank,
  unsetActivePrimaryValidator,
  unsetManagedAccount,
  unsetManagedBank,
  unsetManagedFriend,
  unsetManagedValidator,
};

const appReducers = combineReducers({
  managedAccounts: managedAccounts.reducer,
  managedBanks: managedBanks.reducer,
  managedFriends: managedFriends.reducer,
  managedValidators: managedValidators.reducer,
});

export default appReducers;

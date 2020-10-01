import {combineReducers} from '@reduxjs/toolkit';

import managedAccounts, {
  clearManagedAccounts,
  setManagedAccount,
  setManagedAccountBalance,
  unsetManagedAccount,
} from './managedAccounts';
import managedBanks, {changeActiveBank, clearManagedBanks, setManagedBank, unsetManagedBank} from './managedBanks';
import managedFriends, {clearManagedFriends, setManagedFriend, unsetManagedFriend} from './managedFriends';
import managedValidators, {
  changeActivePrimaryValidator,
  clearManagedValidators,
  setManagedValidator,
  unsetManagedValidator,
} from './managedValidators';

export {
  changeActiveBank,
  changeActivePrimaryValidator,
  clearManagedAccounts,
  clearManagedBanks,
  clearManagedFriends,
  clearManagedValidators,
  setManagedAccount,
  setManagedAccountBalance,
  setManagedBank,
  setManagedFriend,
  setManagedValidator,
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

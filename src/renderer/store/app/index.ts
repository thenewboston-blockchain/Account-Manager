import {combineReducers} from '@reduxjs/toolkit';

import managedAccountsReducer, {clearManagedAccounts, setManagedAccount, unsetManagedAccount} from './managedAccounts';
import managedBanksReducer, {
  changeActiveBank,
  clearManagedBanks,
  setManagedBank,
  unsetManagedBank,
} from './managedBanks';
import managedFriendsReducer, {clearManagedFriends, setManagedFriend, unsetManagedFriend} from './managedFriends';
import managedValidatorsReducer, {
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
  setManagedBank,
  setManagedFriend,
  setManagedValidator,
  unsetManagedAccount,
  unsetManagedBank,
  unsetManagedFriend,
  unsetManagedValidator,
};

const appReducers = combineReducers({
  managedAccounts: managedAccountsReducer,
  managedBanks: managedBanksReducer,
  managedFriends: managedFriendsReducer,
  managedValidators: managedValidatorsReducer,
});

export default appReducers;

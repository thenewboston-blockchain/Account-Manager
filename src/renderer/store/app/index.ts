import {combineReducers} from '@reduxjs/toolkit';

import activeBank, {setActiveBank, unsetActiveBank} from './activeBank';
import activePrimaryValidator, {setActivePrimaryValidator, unsetActivePrimaryValidator} from './activePrimaryValidator';
import managedAccounts, {setManagedAccount, unsetManagedAccount} from './managedAccounts';
import managedBanks, {setManagedBank, unsetManagedBank} from './managedBanks';
import managedFriends, {setManagedFriend, unsetManagedFriend} from './managedFriends';
import managedValidators, {setManagedValidator, unsetManagedValidator} from './managedValidators';

export {
  setActiveBank,
  setActivePrimaryValidator,
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
  activeBank: activeBank.reducer,
  activePrimaryValidator: activePrimaryValidator.reducer,
  managedAccounts: managedAccounts.reducer,
  managedBanks: managedBanks.reducer,
  managedFriends: managedFriends.reducer,
  managedValidators: managedValidators.reducer,
});

export default appReducers;

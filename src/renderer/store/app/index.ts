import {combineReducers} from '@reduxjs/toolkit';

import activeBank, {setActiveBank, unsetActiveBank} from './activeBank';
import activePrimaryValidator, {setActivePrimaryValidator, unsetActivePrimaryValidator} from './activePrimaryValidator';
import managedAccounts, {setManagedAccount, unsetManagedAccount} from './managedAccounts';
import managedFriends, {setManagedFriend, unsetManagedFriend} from './managedFriends';

export {
  setActiveBank,
  setActivePrimaryValidator,
  setManagedAccount,
  setManagedFriend,
  unsetActiveBank,
  unsetActivePrimaryValidator,
  unsetManagedAccount,
  unsetManagedFriend,
};

const appReducers = combineReducers({
  activeBank: activeBank.reducer,
  activePrimaryValidator: activePrimaryValidator.reducer,
  managedAccounts: managedAccounts.reducer,
  managedFriends: managedFriends.reducer,
});

export default appReducers;

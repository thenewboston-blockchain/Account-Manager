import {combineReducers} from '@reduxjs/toolkit';

import activeBank, {setActiveBank, unsetActiveBank} from './activeBank';
import activePrimaryValidator, {setActivePrimaryValidator, unsetActivePrimaryValidator} from './activePrimaryValidator';
import managedAccounts, {setManagedAccount, unsetManagedAccount} from './managedAccounts';
import managedBanks, {setManagedBank, unsetManagedBank} from './managedBanks';
import managedValidators, {setManagedValidator, unsetManagedValidator} from './managedValidators';

export {
  setActiveBank,
  setActivePrimaryValidator,
  setManagedAccount,
  setManagedBank,
  setManagedValidator,
  unsetActiveBank,
  unsetActivePrimaryValidator,
  unsetManagedAccount,
  unsetManagedBank,
  unsetManagedValidator,
};

const appReducers = combineReducers({
  activeBank: activeBank.reducer,
  activePrimaryValidator: activePrimaryValidator.reducer,
  managedAccounts: managedAccounts.reducer,
  managedBanks: managedBanks.reducer,
  managedValidators: managedValidators.reducer,
});

export default appReducers;

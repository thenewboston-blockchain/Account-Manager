import {combineReducers} from '@reduxjs/toolkit';

import activeBank, {setActiveBank, unsetActiveBank} from './activeBank';
import activePrimaryValidator, {setActivePrimaryValidator, unsetActivePrimaryValidator} from './activePrimaryValidator';
import managedAccounts, {setManagedAccount, unsetManagedAccount} from './managedAccounts';

export {
  setActiveBank,
  setActivePrimaryValidator,
  setManagedAccount,
  unsetActiveBank,
  unsetActivePrimaryValidator,
  unsetManagedAccount,
};

const appReducers = combineReducers({
  activeBank: activeBank.reducer,
  activePrimaryValidator: activePrimaryValidator.reducer,
  managedAccounts: managedAccounts.reducer,
});

export default appReducers;
